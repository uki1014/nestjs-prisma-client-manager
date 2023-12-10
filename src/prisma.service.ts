import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query', (event) => {
      const magenta = '\u001b[35m';
      this.logger.log(
        `Query: ${magenta} ${event.query}`,
        `Params: ${magenta} ${event.params}`,
        `Duration: ${magenta} ${event.duration} ms`,
        '---------------------------------',
      );
    });

    this.$on('info', (event) => {
      this.logger.log(`INFO: ${event.message}`);
    });

    this.$on('warn', (event) => {
      this.logger.log(`WARN: ${event.message}`);
    });

    this.$on('error', (event) => {
      this.logger.log(`ERROR: ${event.message}`);
    });
  }
}
