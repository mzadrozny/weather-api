import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PropertiesModule } from './properties/properties.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
    imports: [
    PrismaModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    PropertiesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
