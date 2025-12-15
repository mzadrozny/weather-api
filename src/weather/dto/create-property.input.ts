import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  city!: string;

  @Field()
  street!: string;

  @Field()
  state!: string;

  @Field()
  zipCode!: string;
}
