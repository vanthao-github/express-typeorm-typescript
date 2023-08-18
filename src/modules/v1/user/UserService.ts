import { AppDataSource } from './../../../data-source';
import { User } from "../../../entity/User";
import { DeepPartial } from 'typeorm';
import { BaseServise } from '../../base/service.base';
import { validate } from 'class-validator';
import { isEmpty } from 'lodash';

type UserT = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  role: string,
}

type UserResponse = {
  data?: UserT | any,
  error?: any,
  status?: number,
}

class UserService extends BaseServise(User) {
  private repo = AppDataSource.getRepository(User);

  async getUsers(query: { take?: number, skip?: number, filter?: any, order?: { [field: string]: 'ASC' | 'DESC' }}): Promise<any> {
    const alias = "user";
    const { take, skip, filter, order } = query;
    const qb = this.repo.createQueryBuilder(alias);
    
    if (filter && !isEmpty(filter)) {
      Object.keys(filter).forEach((key: string) => {
        const field = `${alias}.${key}`;
        qb.andWhere(`${field} = :field`, {field: filter[key]});
      })
    }

    if (take) qb.take(take);
    if (skip) qb.skip(skip);
    
    if (order && !isEmpty(order)) {
      Object.keys(order).forEach((key: string) => {
        qb.addOrderBy(`${alias}.${key}`, order[key]);
      })
    } else {
      qb.addOrderBy(`${alias}.id`, 'DESC');
    }

    return qb.getManyAndCount();
  }

  async createUser(params: DeepPartial<User>): Promise<UserResponse> {
		const errors = await validate(params);
    if (errors.length > 0) {
			const message = Object.values(errors[0].constraints);
			return { status: 400, data: {error: message[0] || "Invalid"} }
    } else if (await this.exists({ email: params.email })) {
			return { status: 400, data: { error: `This email address has already been registered.` }};
    } else {
			try {
        const result = await this.repo.save(this.repo.create({...params}));
			  return { data: result, status: 200 };
      } catch (error) {
        console.log('error', error);
        return { data: error.message || 'Bad Request', status: 400};
      }
    }
  }

  async getUserDetails(id: number): Promise<UserResponse> {
    const user = await this.repo.findOne({where: {id: id}});
    if (!user) return { status: 404, data: {error: 'User Not Found!'}}
    return { status: 200, data: user}
  }

  async updateUser(id: number, params: DeepPartial<User>): Promise<UserResponse> {
    let user: DeepPartial<User> = await this.repo.findOne({ where: { id: id}});
    if (!user) return { status: 404, data: { error: 'User not found.'}};
		const errors = await validate(params);
    if (errors.length > 0) {
			const message = Object.values(errors[0].constraints);
			return { status: 400, data: {error: message[0] || "Invalid"} }
    } else {
			try {
        let updatedUser: User | undefined = undefined;
        await AppDataSource.transaction( async (transactionEntityManager)=> {
          await transactionEntityManager.update(User, id, params);
          updatedUser = await transactionEntityManager.findOne(User, { where: { id: id } });
        });
        return { data: updatedUser, status: 200 };
      } catch (error) {
        console.log('error', error);
        return { data: error.message || 'Bad Request', status: 400};
      }
    }
  }

  async deleteUser(id: number) {
    let user = await this.repo.findOne({ where: {id: id} });

    if (!user) {
      return { data: 'User not found', status: 404 };
    }

    await this.repo.remove(user);
    return { data: 'This user has been removed.', status: 200};
  }
}

export default new UserService();