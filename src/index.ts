import * as express from "express"
import * as bodyParser from "body-parser"
import * as dotenv from "dotenv";
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
dotenv.config();

AppDataSource.initialize().then(async () => {
	// create express app
	const app = express()
	app.use(bodyParser.json({ limit: '100mb' }));
	const port = process.env.PORT;

	// register express routes from defined application routes
	Routes.forEach(route => {
		const middlewareFunctions = Array.isArray(route.middleware) ? route.middleware : [];
		(app as any)[route.method](route.route, ...middlewareFunctions, async (req: Request, res: Response, next: Function) => {
			const result = (new (route.controller as any))[route.action](req, res, next)
			if (result instanceof Promise) {
				result.then(result => result !== null && result !== undefined ? res.json(result.body) : undefined);
			} else if (result !== null && result !== undefined) {
				res.json(result)
			}
		})
	})

	// setup express app here
	// ...

	// start express server
	app.listen(port, () => {
		console.log(`⚡️ [Server]: Server is running at http://localhost:${port}`);
	});

	console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
