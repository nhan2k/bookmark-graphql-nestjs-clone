import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { getUserArgs } from './dto/args/get-user-args.dto';
import { createUserInput } from './dto/input/create-user-input.dto';
import { User } from './models/user.module';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: createUserInput) {
    return this.usersService.createUser(createUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: getUserArgs) {
    return this.usersService.getUser(getUserArgs);
  }
}
