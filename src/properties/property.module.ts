import { Module } from '@nestjs/common';
import { PropertiesResolver } from './properties.resolver';
import { PropertiesService } from './properties.service';
import { PropertiesstackClient } from './weatherstack.client';

@Module({
  providers: [PropertiesResolver, PropertiesService, PropertiesstackClient],
})
export class PropertiesModule {}
