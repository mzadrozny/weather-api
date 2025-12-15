import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { WeatherModule } from './weather/weather.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
    imports: [
    PrismaModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    WeatherModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
