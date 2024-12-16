import { PrismaClient } from '@prisma/client';
import { NODE_ENV } from '$env/static/private';

const prisma = globalThis.prisma || new PrismaClient();

if (NODE_ENV === 'development') {
	globalThis.prisma = prisma;
}

export { prisma };
