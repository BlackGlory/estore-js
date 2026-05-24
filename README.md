# estore-js
## Install
```sh
npm install --save @blackglory/estore-js
# or
yarn add @blackglory/estore-js
```

## API
### EStoreClient
```ts
interface INamespaceStats {
  items: number
}

interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

interface IEStoreClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

class EStoreClient {
  static create(options: IEStoreClientOptions): Promise<EStoreClient>

  close(): Promise<void>

  getNamespaceStats(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<INamespaceStats>

  getAllNamespaces(
    signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<string[]>

  getAllItemIds(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<string[]>

  getAllEvents(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<JSONValue[]>

  clearItemsByNamespace(
    namespace: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void>

  removeItem(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void>

  getItemSize(
    namespace: string
  , itemId: string
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<number>

  /**
   * @param nextEventIndex 如果指定, 则会在不匹配下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  appendEvent(
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex?: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void>

  /**
   * @param lastEventIndex 如果指定, 则会在不匹配最后一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  popEvent(
    namespace: string
  , itemId: string
  , lastEventIndex?: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<void>

  getEvent(
    namespace: string
  , itemId: string
  , index: number
  , signalOrOptions?: AbortSignal | IEStoreClientRequestOptions
  ): Promise<JSONValue | null>
}
```
