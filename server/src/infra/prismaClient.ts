import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prismaClient = new PrismaClient();

export default prismaClient;
