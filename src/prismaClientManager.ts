import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { RequestContext } from './requestContext.module';

import type { Prisma } from '@prisma/client';

@Injectable()
export class PrismaClientManager {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContext,
  ) {}

  async transaction<T>(
    fn: () => Promise<T>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<T> {
    try {
      const prismaTransactionClient = this.getPrismaTransactionClient();

      if (prismaTransactionClient) return await fn();

      return await this.prisma.$transaction(
        async (newPrismaTransactionClient) => {
          this.requestContext.set(
            'prismaTransactionClient',
            newPrismaTransactionClient,
          );

          const result = await fn();
          this.clearTransactionClient();
          return result;
        },
        options,
      );
    } catch (error) {
      this.clearTransactionClient();
      throw error;
    }
  }

  getClient(): Prisma.TransactionClient | PrismaService {
    const prismaTransactionClient = this.getPrismaTransactionClient();

    if (prismaTransactionClient) return prismaTransactionClient;

    return this.prisma;
  }

  private getPrismaTransactionClient() {
    return this.requestContext.get('prismaTransactionClient');
  }

  private clearTransactionClient() {
    this.requestContext.set('prismaTransactionClient', null);
  }
}
