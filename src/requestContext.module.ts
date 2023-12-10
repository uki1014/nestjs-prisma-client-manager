import { ClsStore, ClsModule, ClsService } from 'nestjs-cls';
import { Global, Module } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

export interface RequestContextStore extends ClsStore {
  prismaTransactionClient: Prisma.TransactionClient | null;
}

export class RequestContext extends ClsService<RequestContextStore> {}

export const initRequestContext = (requestContext: RequestContext) => {
  requestContext.set('prismaTransactionClient', null);
};

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls) => {
          initRequestContext(cls as RequestContext);
        },
      },
    }),
  ],
  providers: [
    {
      provide: RequestContext,
      useExisting: ClsService,
    },
  ],
  exports: [RequestContext],
})
export class RequestContextModule {}
