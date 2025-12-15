import { Module } from '@nestjs/common';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';
import { WeatherstackClient } from './weatherstack.client';

@Module({
  providers: [WeatherResolver, WeatherService, WeatherstackClient],
})
export class WeatherModule {}
