import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WeatherFilterInput {
  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zipCode?: string;
}
