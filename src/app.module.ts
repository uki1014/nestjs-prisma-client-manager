import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RequestContextModule } from './requestContext.module';
import { UserRepository } from './repository/user.repository';
import { PostRepository } from './repository/post.repository';
import { PrismaClientManager } from './prismaClientManager';

@Module({
  imports: [RequestContextModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    PrismaClientManager,
    UserRepository,
    PostRepository,
  ],
})
export class AppModule {}
