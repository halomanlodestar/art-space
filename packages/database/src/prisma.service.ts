/** @format */

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../prisma/output";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await (this.$connect() as Promise<void>).then(() => {
			console.log("Connected to the database");
		});
	}

	async onModuleDestroy() {
		await (this.$disconnect() as Promise<void>).then(() => {
			console.log("Disconnected from the database");
		});
	}
}
