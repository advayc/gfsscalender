import { PrismaClient } from '@prisma/client';

// Prevent hot-reload instantiations in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Helpful runtime checks: warn if misconfigured instead of throwing at build-time
if (process.env.NODE_ENV === 'production') {
	const dbUrl = process.env.DATABASE_URL;
	if (!dbUrl) {
		console.warn(
			'[prisma] DATABASE_URL is not set. Ensure this is configured in your hosting provider (e.g., Vercel).'
		);
	} else if (dbUrl.startsWith('file:')) {
		console.warn(
			"[prisma] DATABASE_URL points to a sqlite file. In production you should use a Postgres database (e.g., Supabase)."
		);
	}
}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
