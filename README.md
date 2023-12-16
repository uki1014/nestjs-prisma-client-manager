# nestjs-prisma-client-manager

This repository is a sample implementation for using Prisma Interactive Transaction across multiple modules.

```ts
// someUseCase.ts
await this.prismaClientManager.transaction(async () => {
  await this.someThingsARepository.create();
  await this.someThingsBRepository.create();
})

// somethingsARepository.ts
class SomeThingARepository {
  constructor(private prismaClientManager: PrismaClientManager) {}

  async create() {
    const prisma = this.prismaClientManager.getClient();
    await prisma.someThingA.create(...);
  }
}

// somethingsBRepository.ts
class SomeThingBRepository {
  constructor(private prismaClientManager: PrismaClientManager) {}

  async create() {
    const prisma = this.prismaClientManager.getClient();
    await prisma.someThingB.create(...);
  }
}
```
