/** @format */

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../prisma/output"; // Updated import statement

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
		console.log("Connected to the database");
	}

	async onModuleDestroy() {
		await this.$disconnect();
		console.log("Disconnected from the database");
	}
}
