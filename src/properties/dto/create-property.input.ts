import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  city!: string;

  @Field()
  street!: string;

  @Field()
  state!: string; // np. AZ

  @Field()
  zipCode!: string; // 5 cyfr
}
