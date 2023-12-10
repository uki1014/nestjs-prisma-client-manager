import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { PrismaClientManager } from '../prismaClientManager';

@Injectable()
export class UserRepository {
  constructor(private prismaClientManager: PrismaClientManager) {}

  async create() {
    const prisma = this.prismaClientManager.getClient();
    const randomId = ulid();
    const user = await prisma.user.create({
      data: {
        email: `test+${randomId}@test.com`,
        name: `test+${randomId}`,
      },
    });
    return user;
  }
}
