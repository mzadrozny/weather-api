import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { Property } from './dto/property.model';
import { CreatePropertyInput } from './dto/create-property.input';
import { WeatherFilterInput } from './dto/properties-filter.input';
import { WeatherSortInput } from './dto/properties-sort.input';

@Resolver(() => Property)
export class WeatherResolver {
  constructor(private readonly service: WeatherService) {}

  @Query(() => Property)
  property(@Args('id', { type: () => ID }) id: string) {
    return this.service.getProperty(id);
  }

  @Query(() => [Property])
  properties(
    @Args('filter', { nullable: true }) filter?: WeatherFilterInput,
    @Args('sort', { nullable: true }) sort?: WeatherSortInput,
  ) {
    return this.service.listWeather(filter, sort);
  }

  @Mutation(() => Property)
  createProperty(@Args('input') input: CreatePropertyInput) {
    return this.service.createProperty(input);
  }

  @Mutation(() => Property)
  deleteProperty(@Args('id', { type: () => ID }) id: string) {
    return this.service.deleteProperty(id);
  }
}
