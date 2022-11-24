import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { getUserArgs } from './dto/args/get-user-args.dto';
import { createUserInput } from './dto/input/create-user-input.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './models/user.schema';
import { User } from './models/user.module';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserData: createUserInput) {
    await this.validateCreateUserData(createUserData);
    const userDocument = await this.userRepository.create({
      ...createUserData,
      password: await bcrypt.hash(createUserData.password, 10),
    });
    return this.toModel(userDocument);
  }

  private async validateCreateUserData(createUserData: createUserInput) {
    try {
      await this.userRepository.findOne({ email: createUserData.email });
      throw new UnprocessableEntityException('Email already exists.');
    } catch (error) {}
  }

  async getUser(getUserArgs: getUserArgs) {
    const userDocument = await this.userRepository.findOne(getUserArgs);
    return this.toModel(userDocument);
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return this.toModel(userDocument);
  }

  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
    };
  }
}
