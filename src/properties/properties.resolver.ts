import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { PropertiesService } from './properties.service';
import { Property } from './dto/property.model';
import { CreatePropertyInput } from './dto/create-property.input';
import { PropertiesFilterInput } from './dto/properties-filter.input';
import { PropertiesSortInput } from './dto/properties-sort.input';

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(private readonly service: PropertiesService) {}

  // zostaw ping, bo jest fajny do sanity check
  @Query(() => String)
  ping() {
    return 'pong';
  }

  @Query(() => Property)
  property(@Args('id', { type: () => ID }) id: string) {
    return this.service.getProperty(id);
  }

  @Query(() => [Property])
  properties(
    @Args('filter', { nullable: true }) filter?: PropertiesFilterInput,
    @Args('sort', { nullable: true }) sort?: PropertiesSortInput,
  ) {
    return this.service.listProperties(filter, sort);
  }

  @Mutation(() => Property)
  createProperty(@Args('input') input: CreatePropertyInput) {
    return this.service.createProperty(input);
  }

  @Mutation(() => Property)
  deleteProperty(@Args('id', { type: () => ID }) id: string) {
    return this.service.deleteProperty(id);
  }
}
