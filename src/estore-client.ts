import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, INamespaceStats } from './contract.js'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { isntUndefined, isUndefined, JSONValue } from '@blackglory/prelude'
export { INamespaceStats } from './contract.js'
export { EventIndexConflict } from './contract.js'

export interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class EStoreClient {
  static async create(options: IEStoreClientOptions): Promise<EStoreClient> {
    const { client, close } = await createRPCClient(
      options.server
    , options.retryIntervalForReconnection
    , options.timeout
    )
    return new EStoreClient(client, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async getNamespaceStats(
    namespace: string
  , signal?: AbortSignal
  ): Promise<INamespaceStats> {
    return await this.client.getNamespaceStats(
      namespace
    , this.withTimeout(signal)
    )
  }

  async getAllNamespaces(signal?: AbortSignal): Promise<string[]> {
    return await this.client.getAllNamespaces(this.withTimeout(signal))
  }

  async getAllItemIds(
    namespace: string
  , signal?: AbortSignal
  ): Promise<string[]> {
    return await this.client.getAllItemIds(namespace, this.withTimeout(signal))
  }

  async getAllEvents(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<JSONValue[]> {
    return await this.client.getAllEvents(
      namespace
    , itemId
    , this.withTimeout(signal)
    )
  }

  async clearItemsByNamespace(
    namespace: string
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.clearItemsByNamespace(namespace, this.withTimeout(signal))
  }

  async removeItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.removeItem(namespace, itemId, this.withTimeout(signal))
  }

  async getItemSize(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<number> {
    return await this.client.getItemSize(
      namespace
    , itemId
    , this.withTimeout(signal)
    )
  }

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  async appendEvent(
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex?: number
  , signal?: AbortSignal
  ): Promise<void> {
    if (isUndefined(nextEventIndex)) {
      await this.client.appendEvent(
        namespace
      , itemId
      , event
      , this.withTimeout(signal)
      )
    } else {
      await this.client.appendEvent(
        namespace
      , itemId
      , event
      , nextEventIndex
      , this.withTimeout(signal)
      )
    }
  }

  async getEvent(
    namespace: string
  , itemId: string
  , index: number
  , signal?: AbortSignal
  ): Promise<JSONValue | null> {
    return await this.client.getEvent(
      namespace
    , itemId
    , index
    , this.withTimeout(signal)
    )
  }

  private withTimeout(signal?: AbortSignal): AbortSignal {
    return raceAbortSignals([
      isntUndefined(this.timeout) && timeoutSignal(this.timeout)
    , signal
    ])
  }
}
