import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "127.0.0.1",
	port: 3306,
	username: String(process.env.DB_USERNAME),
	password: String(process.env.DB_PASSWORD),
	database: String(process.env.DB_DATABASE),
	synchronize: false,
	logging: true,
	migrationsRun: true,
  entities: ["src/entity/**/*.{ts,js}"],
  migrations: ["src/migration/**/*.{ts,js}"],
  subscribers: ["src/subscriber/**/*.{ts,js}"],
})
