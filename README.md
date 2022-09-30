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
interface IInfo {
  namespace: string
  items: number
}

interface IEStoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IEStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

interface IEStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class EStoreClient {
  constructor(options: IEStoreClientOptions)

  append<T>(
    namespace: string
  , itemId: string
  , payload: T
  , index?: number
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void>

  getEvent<T>(
    namespace: string
  , itemId: string
  , index: number
  , options: IEStoreClientRequestOptions = {}
  ): Promise<T | undefined>

  getEvents<T>(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<T[] | undefined>

  getSize(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<number>

  has(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<boolean>

  del(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void>

  clear(
    namespace: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void> 

  getAllItemIds(
    namespace: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<string[]>

  getAllNamespaces(
    options: IEStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]>

  stats(
    namespace: string
  , options: IEStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo>
}
```

### EStoreManager
```ts
interface IEStoreManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class EStoreManager {
  constructor(options: IEStoreManagerOptions)

  JsonSchema: JsonSchemaClient
  Blacklist: BlacklistClient
  Whitelist: WhitelistClient
  TokenPolicy: TokenPolicyClient
  Token: TokenClient
}
```

#### JsonSchemaClient
```ts
class JsonSchemaClient {
  getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]>
  get(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<unknown>
  set(
    namespace: string
  , schema: Json
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  remove(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
}
```

#### BlacklistClient
```ts
class BlacklistClient {
  getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistClient
```ts
class WhitelistClient {
  getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyClient
```ts
interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

class TokenPolicyClient {
  getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeWriteTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeReadTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenClient
```ts
interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

class TokenClient {
  getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addWriteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeWriteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  addReadToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeReadToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  addDeleteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
  removeDeleteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void>
}

```
