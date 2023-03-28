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

  getNamespaceStats(namespace: string, timeout?: number): Promise<INamespaceStats>

  getAllNamespaces(timeout?: number): Promise<string[]>

  getAllItemIds(namespace: string, timeout?: number): Promise<string[]>

  getAllEvents(
    namespace: string
  , itemId: string
  , timeout?: number
  ): Promise<JSONValue[]>

  clearItemsByNamespace(namespace: string, timeout?: number): Promise<void>

  removeItem(namespace: string, itemId: string, timeout?: number): Promise<void>

  getItemSize(namespace: string, itemId: string, timeout?: number): Promise<number>

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  appendEvent(
    namespace: string
  , itemId: string
  , event: JSONValue
  , nextEventIndex?: number
  , timeout?: number
  ): Promise<void>

  getEvent(
    namespace: string
  , itemId: string
  , index: number
  , timeout?: number
  ): Promise<JSONValue | null>
}
```
