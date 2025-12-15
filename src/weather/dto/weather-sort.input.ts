import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from './sort-order.enum';

@InputType()
export class WeatherSortInput {
  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
}
