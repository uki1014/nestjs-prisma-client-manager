import { Injectable } from '@nestjs/common';
import { PrismaClientManager } from './prismaClientManager';
import { UserRepository } from './repository/user.repository';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class AppService {
  constructor(
    private prismaClientManager: PrismaClientManager,
    private userRepository: UserRepository,
    private postRepository: PostRepository,
  ) {}

  async createUserAndPost() {
    await this.prismaClientManager.transaction(async () => {
      const user = await this.userRepository.create();

      await this.postRepository.create({
        authorId: user.id,
      });
    });
  }
}
