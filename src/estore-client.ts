import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy, BatchClient, BatchClientProxy } from 'delight-rpc'
import { IAPI, IStats } from './contract.js'
import { timeoutSignal, withAbortSignal } from 'extra-abort'
import { isUndefined } from '@blackglory/prelude'
export { IStats } from './contract.js'
export { EventIndexConflict } from './contract.js'

export interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class EStoreClient {
  static async create(options: IEStoreClientOptions): Promise<EStoreClient> {
    const { client, batchClient, proxy, close } = await createRPCClient(options.server)
    return new EStoreClient(client, batchClient, proxy, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private batchClient: BatchClient
  , private batchProxy: BatchClientProxy<IAPI, unknown>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async stats(namespace: string, timeout?: number): Promise<IStats> {
    return await this.withTimeout(
      () => this.client.stats(namespace)
    , timeout ?? this.timeout
    )
  }

  async getAllNamespaces(timeout?: number): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllNamespaces()
    , timeout ?? this.timeout
    )
  }

  async getAllItemIds(namespace: string, timeout?: number): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllItemIds(namespace)
    , timeout ?? this.timeout
    )
  }

  async getAllEvents(
    namespace: string
  , itemId: string
  , timeout?: number
  ): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllEvents(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  async clearItemsByNamespace(namespace: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.clearItemsByNamespace(namespace)
    , timeout ?? this.timeout
    )
  }

  async removeItem(namespace: string, itemId: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.removeItem(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  async getItemSize(namespace: string, itemId: string, timeout?: number): Promise<number> {
    return await this.withTimeout(
      () => this.client.getItemSize(namespace, itemId)
    , timeout ?? this.timeout
    )
  }

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  async appendEvent(
    namespace: string
  , itemId: string
  , event: string
  , nextEventIndex?: number
  , timeout?: number
  ): Promise<void> {
    await this.withTimeout(
      () => {
        if (isUndefined(nextEventIndex)) {
          return this.client.appendEvent(namespace, itemId, event)
        } else {
          return this.client.appendEvent(namespace, itemId, event, nextEventIndex)
        }
      }
    , timeout ?? this.timeout
    )
  }

  async getEvent(
    namespace: string
  , itemId: string
  , index: number
  , timeout?: number
  ): Promise<string | null> {
    return await this.withTimeout(
      () => this.client.getEvent(namespace, itemId, index)
    , timeout ?? this.timeout
    )
  }

  private async withTimeout<T>(
    fn: () => PromiseLike<T>
  , timeout: number | undefined = this.timeout
  ): Promise<T> {
    if (timeout) {
      return await withAbortSignal(timeoutSignal(timeout), fn)
    } else {
      return await fn()
    }
  }
}
