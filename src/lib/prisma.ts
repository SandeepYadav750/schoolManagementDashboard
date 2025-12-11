import { PrismaClient } from '@prisma/client';

// Extend the global type with our prisma client
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse the existing instance if it exists, otherwise create a new one
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: logs all queries to the console
  });

// In development, keep the same instance across hot reloads
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
