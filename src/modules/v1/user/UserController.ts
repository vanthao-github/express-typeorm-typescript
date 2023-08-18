import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import { User } from "../../../entity/User";
import UserService from "./UserService";

export class UserController {
	async index(request: Request, response: Response, next: NextFunction): Promise<any> {
		const [users, total] = await UserService.getUsers(request?.query);
		return response.status(200).json({data: users, metadata: {total}});	
	}

	async create(request: Request, response: Response, next: NextFunction) {
		const { email, firstName, lastName, role, password } = request.body;

		const params = Object.assign(new User(), {
				email,
				firstName,
				lastName,
				role,
				password: await bcrypt.hash(password, 14)
		})
		const userRes = await UserService.createUser(params);
		return response.status(userRes.status).json({data: userRes.data});	
	}

	async show(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id)
		const user = await UserService.getUserDetails(id);
		return response.status(user.status).json({data: user.data});
	}

	async edit(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);
		const { email, firstName, lastName, role, password } = request.body;

		const params = Object.assign(new User(), {
				email,
				firstName,
				lastName,
				role,
				password: await bcrypt.hash(password, 14)
		})
		const userRes = await UserService.updateUser(id, params);
		return response.status(userRes.status).json({data: userRes.data});	
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id)
		const result = await UserService.deleteUser(id);
		return response.status(result.status).json({data: result.data});
	}
}