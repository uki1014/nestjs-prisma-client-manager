import { Injectable } from '@nestjs/common';
import { PrismaClientManager } from '../prismaClientManager';

@Injectable()
export class PostRepository {
  constructor(private prismaClientManager: PrismaClientManager) {}

  async create({ authorId }: { authorId: number }) {
    const prisma = this.prismaClientManager.getClient();
    const post = await prisma.post.create({
      data: {
        title: 'test',
        content: 'test',
        published: true,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    return post;
  }
}
