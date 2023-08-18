import { EntityManager, ObjectType, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export interface IBaseService<T> {
  // findManyAndPagination(
  //   filter?: any,
  //   order?: { [field: string]: 'ASC' | 'DESC'},
  //   take?: number,
  //   skip?: number,
  // ): Promise<[T[], number]>;
  exists(conditions: any, manager?: EntityManager): Promise<boolean>;
}

export function BaseServise<T>(entity: ObjectType<T>): new () => IBaseService<T> {
  return class implements IBaseService<T> {
    private repository: Repository<T>;

    constructor() {
      this.repository = AppDataSource.getRepository(entity);
    }

    async exists(conditions: any, manager?: EntityManager): Promise<boolean> {
      if (manager) {
        return Boolean(await manager.count(conditions));;
      } else {
        return Boolean(await this.repository.count({where: conditions}));
      }
    }
  }
}