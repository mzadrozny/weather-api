import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  home() {
    return {
      graphql: 'http://localhost:3000/graphql',
      examples: {
        listProperties: `
query {
  properties {
    id
    city
    state
    zipCode
    createdAt
  }
}
        `,
        createProperty: `
mutation {
  createProperty(input: {
    city: "Fountain Hills"
    street: "15528 E Golden Eagle Blvd"
    state: "AZ"
    zipCode: "85268"
  }) {
    id
  }
}
        `,
        getPropertyById: `
query {
  property(id: "PROPERTY_ID") {
    id
    city
    street
    PropertiesData
  }
}
        `,
      },
    };
  }
}
