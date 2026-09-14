import { PrismaClient } from '@prisma/client';

// Prevent hot-reload instantiations in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// NOTE: no import-time DATABASE_URL check on purpose. The Vercel build
// collects page data without env vars; a throw here fails the whole
// build. Missing/invalid DATABASE_URL surfaces per-request and falls
// into route try/catch (synthetic fallback).

// Configure Prisma Client with optimal settings for serverless environments.
// Skip datasources override when DATABASE_URL missing so construction
// succeeds and per-query errors fall into route try/catch (synthetic fallback).
export const prisma = globalForPrisma.prisma || new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	...(process.env.DATABASE_URL ? { datasources: { db: { url: process.env.DATABASE_URL } } } : {}),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
