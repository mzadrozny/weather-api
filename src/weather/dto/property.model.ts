import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Property {
  @Field(() => ID)
  id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  city!: string;

  @Field()
  street!: string;

  @Field()
  state!: string;

  @Field()
  zipCode!: string;

  @Field(() => Float)
  lat!: number;

  @Field(() => Float)
  long!: number;

  @Field(() => GraphQLJSONObject)
  weatherData!: any;
}
