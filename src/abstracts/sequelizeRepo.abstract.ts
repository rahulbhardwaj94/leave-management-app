import { Model, FindOptions, ModelStatic, Attributes } from 'sequelize';

/**
 * The ISequelizeGenericRepository abstract class dictate the contract for
 * all the repositories. When any class/service agrees to contract defined
 * by this abstract class, they have to extend the following methods.
 *
 * The contract dictate for a repository for fetching all data, fetch by id,
 * insert record, update record by Id
 *
 */
export abstract class ISequelizeGenericRepository<T extends Model> {
  constructor(protected readonly entityModel: ModelStatic<T>) {}

  /**
   * The findAll method default implementation for finding all entities
   */
  async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.entityModel.findAll(options);
  }

  /**
   * The findOne method default implementation for finding an entity
   * by provided options query filter
   */
  async findOne(options: FindOptions): Promise<T | null> {
    return this.entityModel.findOne(options);
  }

  /**
   * The create method default implementation for creating/saving
   * an entity in the table and return saved entity.
   */
  async create(createEntityDto: any): Promise<T> {
    return this.entityModel.create(createEntityDto);
  }

  /**
   * The update method default implementation for updating an entity
   * by provided query filter and values
   */
  async update(
    updateEntityDto: any,
    options: any,
  ): Promise<[affectedCount: number, affectedRows: T[]]> {
    return this.entityModel.update(updateEntityDto, options);
  }

  /**
   * Upserts an entity into the database.
   * @param upsertEntityDto - The entity to be upserted.
   * @param options - Optional parameters for the upsert operation.
   * @returns A promise that resolves to a tuple containing the upserted entity and a boolean indicating if the entity was newly created.
   */
  async upsert(upsertEntityDto: any, options?: any): Promise<[T, boolean]> {
    return this.entityModel.upsert(upsertEntityDto, options);
  }
}
