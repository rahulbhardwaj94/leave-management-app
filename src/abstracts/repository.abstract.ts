import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

/**
 * The IMongooseGenericRepository interface dictate the contract for
 * all the data connectors. When any class/service agrees to contract defined
 * by this interface, they have to implement the following methods.
 *
 * The contract dictate for a repository for fetching all data, fetch by id,
 * insert record, update record by Id
 *
 */
export abstract class IMongooseGenericRepository<T extends Document> {
  /**
   * As constructor it accepts the EntityModel
   * @param entityModel Model<T>
   */
  constructor(protected readonly entityModel: Model<T>) {}

  /**
   * The findOne method default implementation for finding a document
   * by provided query filter and projection
   */
  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel.findOne(
      entityFilterQuery,
      {
        __v: 0,
        _id: 0,
        ...projection,
      },
      options,
    );
  }

  /**
   * The find method default implementation for finding a documents
   * by provided query filter and projection
   */
  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T[] | null> {
    return this.entityModel.find(
      entityFilterQuery,
      {
        __v: 0,
        _id: 0,
        ...projection,
      },
      options,
    );
  }

  /**
   * The create method default implementation for creating/saving
   * document in the collection and return saved document.
   */

  /********Adding create instead of new and save as create is a wrapper
    and works the same refer: https://masteringjs.io/tutorials/mongoose/create */

  async create(createEntityData: unknown): Promise<T> {
    return this.entityModel.create(createEntityData);
  }

  /**
   * The findOneAndUpdate method default implementation for finding document
   * and update it by provided query filter and values
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      filterQuery,
      updateEntityData,
      options,
    );
  }

  // findAll function
  /**
   * Retrieves all entities from the repository.
   *
   * @param projection - An optional object specifying which fields to include or exclude in the result.
   * @param options - Optional query options to customize the retrieval behavior.
   * @returns A promise that resolves to an array of entities of type T.
   */
  async findAll(
    projection?: Record<string, unknown>,
    options?: QueryOptions,
  ): Promise<T[]> {
    return this.entityModel.find(
      {},
      {
        __v: 0,
        _id: 0,
        ...projection,
      },
      options,
    );
  }
}
