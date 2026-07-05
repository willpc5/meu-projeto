import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export default prisma;

/*
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
*/