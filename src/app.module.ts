import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PropertiesModule } from './properties/property.module';

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
