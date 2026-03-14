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

export interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class EStoreClient {
  static create(options: IEStoreClientOptions): Promise<EStoreClient>

  close(): Promise<void>

  getNamespaceStats(
    namespace: string
  , signal?: AbortSignal
  ): Promise<INamespaceStats>

  getAllNamespaces(signal?: AbortSignal): Promise<string[]>

  getAllItemIds(namespace: string, signal?: AbortSignal): Promise<string[]>

  getAllEvents(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<JSONValue[]>

  clearItemsByNamespace(namespace: string, signal?: AbortSignal): Promise<void>

  removeItem(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
  ): Promise<void>

  getItemSize(
    namespace: string
  , itemId: string
  , signal?: AbortSignal
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
  , signal?: ABortSignal
  ): Promise<void>

  /**
   * @param lastEventIndex 如果指定, 则会在不匹配最后一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  popEvent(
    namespace: string
  , itemId: string
  , lastEventIndex?: number
  , signal?: AbortSignal
  ): Promise<void>

  getEvent(
    namespace: string
  , itemId: string
  , index: number
  , signal?: AbortSignal
  ): Promise<JSONValue | null>
}
```
