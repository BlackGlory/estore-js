import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { IAPI, INamespaceStats } from './contract.js'
import { isAbortSignal, raceAbortSignals, timeoutSignal } from 'extra-abort'
import { isUndefined, JSONValue } from '@blackglory/prelude'
export { INamespaceStats } from './contract.js'
export { EventIndexConflict } from './contract.js'

export interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export interface IEStoreClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
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
  , private closeClient: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClient()
  }

  async getNamespaceStats(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<INamespaceStats> {
    return await this.client.getNamespaceStats(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async getAllNamespaces(
    signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllNamespaces(
      this.createSignal(signalOrOptions)
    )
  }

  async getAllItemIds(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllItemIds(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async getAllEvents(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<JSONValue[]> {
    return await this.client.getAllEvents(
      namespace
    , itemId
    , this.createSignal(signalOrOptions)
    )
  }

  async clearItemsByNamespace(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void> {
    await this.client.clearItemsByNamespace(
      namespace
    , this.createSignal(signalOrOptions)
    )
  }

  async removeItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void> {
    await this.client.removeItem(
      namespace
    , itemId
    , this.createSignal(signalOrOptions)
    )
  }

  async getItemSize(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<number> {
    return await this.client.getItemSize(
      namespace
    , itemId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @param nextEventIndex 如果指定, 则会在不匹配下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  async appendEvent(
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex?: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void> {
    if (isUndefined(nextEventIndex)) {
      await this.client.appendEvent(
        namespace
      , itemId
      , event
      , this.createSignal(signalOrOptions)
      )
    } else {
      await this.client.appendEvent(
        namespace
      , itemId
      , event
      , nextEventIndex
      , this.createSignal(signalOrOptions)
      )
    }
  }

  /**
   * @param lastEventIndex 如果指定, 则会在不匹配最后一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  async popEvent(
    namespace: string
  , itemId: string
  , lastEventIndex?: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void> {
    if (isUndefined(lastEventIndex)) {
      await this.client.popEvent(
        namespace
      , itemId
      , this.createSignal(signalOrOptions)
      )
    } else {
      await this.client.popEvent(
        namespace
      , itemId
      , lastEventIndex
      , this.createSignal(signalOrOptions)
      )
    }
  }

  async getEvent(
    namespace: string
  , itemId: string
  , index: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<JSONValue | null> {
    return await this.client.getEvent(
      namespace
    , itemId
    , index
    , this.createSignal(signalOrOptions)
    )
  }

  private createSignal(
    signalOrOptions: AbortSignal | IEStoreClientRequestOptions = {}
  ): AbortSignal {
    const options: IEStoreClientRequestOptions = isAbortSignal(signalOrOptions)
                                               ? { signal: signalOrOptions }
                                               : signalOrOptions

    return raceAbortSignals([
      options.signal
    , options.timeout !== false && (
        (options.timeout && timeoutSignal(options.timeout)) ??
        (this.timeout && timeoutSignal(this.timeout))
      )
    ])
  }
}
