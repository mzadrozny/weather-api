import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePropertyInput } from './dto/create-property.input';
import { WeatherstackClient } from './weatherstack.client';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { PropertiesFilterInput } from './dto/properties-filter.input';
import { PropertiesSortInput } from './dto/properties-sort.input';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weather: WeatherstackClient,
  ) {}

  private validateUS(input: CreatePropertyInput) {
    if (!/^[A-Z]{2}$/.test(input.state))
      throw new BadRequestException(
        'state must be 2-letter abbreviation (uppercase)',
      );
    if (!/^\d{5}$/.test(input.zipCode))
      throw new BadRequestException('zipCode must be 5 digits');
  }

  async createProperty(input: CreatePropertyInput) {
    this.validateUS(input);

    const key = process.env.WEATHERSTACK_ACCESS_KEY;
    if (!key)
      throw new BadRequestException('Missing WEATHERSTACK_ACCESS_KEY in .env');

    const query = `${input.street}, ${input.city}, ${input.state} ${input.zipCode}, USA`;
    const wx = await this.weather.getCurrentWeather(query, key);

    return this.prisma.property.create({
      data: {
        city: input.city,
        street: input.street,
        state: input.state,
        zipCode: input.zipCode,
        lat: wx.lat,
        long: wx.long,
        weatherData: wx.weatherData,
      },
    });
  }

  async getProperty(id: string) {
    const p = await this.prisma.property.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Property not found');
    return p;
  }

  async listProperties(
    filter?: PropertiesFilterInput,
    sort?: PropertiesSortInput,
  ) {
    return this.prisma.property.findMany({
      where: {
        city: filter?.city ? { equals: filter.city } : undefined,
        state: filter?.state
          ? { equals: filter.state.toUpperCase() }
          : undefined,
        zipCode: filter?.zipCode ? { equals: filter.zipCode } : undefined,
      },
      orderBy: sort?.createdAt
        ? { createdAt: sort.createdAt }
        : { createdAt: 'desc' },
    });
  }

  async deleteProperty(id: string) {
    const exists = await this.prisma.property.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Property not found');

    return this.prisma.property.delete({ where: { id } });
  }
}
