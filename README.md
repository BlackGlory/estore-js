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
interface IStats {
  namespace: string
  items: number
}

interface IEStoreClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

class EStoreClient {
  static create(options: IEStoreClientOptions): Promise<EStoreClient>

  close(): Promise<void>

  stats(namespace: string, timeout?: number): Promise<IStats>
  getAllNamespaces(timeout?: number): Promise<string[]>
  getAllItemIds(namespace: string, timeout?: number): Promise<string[]>
  getAllEvents(
    namespace: string
  , itemId: string
  , timeout?: number
  ): Promise<string[]>

  clearItemsByNamespace(namespace: string, timeout?: number): Promise<void>
  removeItem(namespace: string, itemId: string, timeout?: number): Promise<void> 
  getItemSize(namespace: string, itemId: string, timeout?: number): Promise<number>

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {IllegalIndex}
   */
  appendEvent(
    namespace: string
  , itemId: string
  , event: string
  , nextEventIndex?: number
  , timeout?: number
  ): Promise<void>

  getEvent(
    namespace: string
  , itemId: string
  , index: number
  , timeout?: number
  ): Promise<string | null>
}
```
