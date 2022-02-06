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
new EStoreClient({
  server: string
, token?: string
, basicAuth?: {
    username: string
  , password: string
  }
, keepalive?: boolean
, timeout?: number
})
```

```ts
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
```

#### append
```ts
EStoreClient#append(
  namespace: string
, itemId: string
, payload: Json
, index?: number
, options?: IEStoreClientRequestOptions
): Promise<void>
```

#### getEvent
```ts
EStoreClient#getEvent(
  namespace: string
, itemId: string
, index: number
, options?: IEStoreClientRequestOptions
): Promise<Json | undefined>
```

#### getEvents
```ts
EStoreClient#getEvents(
  namespace: string
, itemId: string
, options?: IEStoreClientRequestOptions
): Promise<Json[] | undefined>
```

#### getSize
```ts
EStoreClient#getSize(
  namespace: string
, itemId: string
, optinos?: IEStoreClientRequestOptions
): Promise<number>
```

#### has
```ts
EStoreClient#has(
  namespace: string
, itemId: string
, options?: IEStoreClientRequestOptions
): Promise<boolean>
```

#### del
```ts
EStoreClient#del(
  namespace: string
, itemId: string
, options?: IEStoreClientRequestOptions
): Promise<void>
```

#### clear
```ts
EStoreClient#clear(
  namespace: string
, options?: IEStoreClientRequestOptions
): Promise<void>
```

#### getAllItemIds
```ts
EStoreClient#getAllItemIds(
  namespace: string
, options?: IEStoreClientRequestOptions
): Promise<string[]>
```

#### getAllNamespaces
```ts
EStoreClient#getAllNamespaces(
  options?: IEStoreClientRequestOptionsWithoutToken
): Promise<string[]>
```

#### stats
```ts
EStoreClient#stats(
  namespace: string
, options?: IEStoreClientRequestOptionsWithoutToken
): Promise<<{
  namespace: string
  items: number
}>
```

### EStoreManager
```ts
new EStoreManager({
  server: string
, adminPassword: string
, keepalive?: boolean
, timeout?: number
})
```

```ts
interface IEStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}
```

#### JsonSchema
##### getNamespaces
```ts
EStoreManager#JsonSchema.getNamespaces(
  options?: IEStoreManagerRequestOptions
): Promise<string[]>
```

##### get
```ts
EStoreManager#JsonSchema.get(namespace: string, options?: IEStoreManagerRequestOptions): Promise<Json>
```

##### set
```ts
EStoreManager#JsonSchema.set(
  namespace: string
, schema: Json
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### remove
```ts
EStoreManager#JsonSchema.remove(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

#### Blacklist
##### getNamespaces
```ts
EStoreManager#Blacklist.getNamespaces(
  options?: IEStoreManagerRequestOptions
): Promise<string[]>
```

##### add
```ts
EStoreManager#Blacklist.add(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### remove
```ts
EStoreManager#Blacklist.remove(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

#### Whitelist
##### getNamespaces
```ts
EStoreManager#Whitelist.getNamespaces(
  options?: IEStoreManagerRequestOptions
): Promise<string[]>
```

##### add
```ts
EStoreManager#Whitelist.add(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### remove
```ts
EStoreManager#Whitelist.remove(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

#### TokenPolicy
##### getNamespaces
```ts
EStoreManager#TokenPolicy.getNamespaces(
  options?: IEStoreManagerRequestOptions
): Promise<string[]>
```

##### get
```ts
EStoreManager#TokenPolicy.get(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<{
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}>
```

##### setWriteTokenRequired
```ts
EStoreManager#TokenPolicy.setWriteTokenRequired(
  namespace: string
, val: boolean
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteTokenRequired
```ts
EStoreManager#TokenPolicy.removeWriteTokenRequired(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### setReadTokenRequired
```ts
EStoreManager#TokenPolicy.setReadTokenRequired(
  namespace: string
, val: boolean
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeReadTokenRequired
```ts
EStoreManager#TokenPolicy.removeReadTokenRequired(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### setDeleteTokenRequired
```ts
EStoreManager#TokenPolicy.setDeleteTokenRequired(
  namespace: string
, val: boolean
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteTokenRequired
```ts
EStoreManager#TokenPolicy.removeDeleteTokenRequired(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

#### Token
##### getNamespaces
```ts
EStoreManager#Token.getNamespaces(options?: IEStoreManagerRequestOptions): Promise<string[]>
```

##### getTokens
```ts
EStoreManager#Token.getTokens(
  namespace: string
, options?: IEStoreManagerRequestOptions
): Promise<Array<{
  token: string
  write: boolean
  read: boolean
  delete: boolean
}>>
```

##### addWriteToken
```ts
EStoreManager#Token.addWriteToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeWriteToken
```ts
EStoreManager#Token.removeWriteToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### addReadToken
```ts
EStoreManager#Token.addReadToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeReadToken
```ts
EStoreManager#Token.removeReadToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### addDeleteToken
```ts
EStoreManager#Token.addDeleteToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```

##### removeDeleteToken
```ts
EStoreManager#Token.removeDeleteToken(
  namespace: string
, token: string
, options?: IEStoreManagerRequestOptions
): Promise<void>
```
