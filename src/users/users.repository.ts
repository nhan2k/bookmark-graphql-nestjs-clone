import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { AbstractRepository } from 'src/database/abstract.repository';
import { UserDocument } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.module';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
