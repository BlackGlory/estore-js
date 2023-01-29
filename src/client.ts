import { fetch } from 'extra-fetch'
import { head, post, get, del, IRequestOptionsTransformer } from 'extra-request'
import { url, appendPathname, json, searchParams, signal, basicAuth, keepalive, header } from 'extra-request/transformers'
import { NotFound } from '@blackglory/http-status'
import { ok, toJSON } from 'extra-response'
import { Falsy } from 'justypes'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { isntUndefined } from '@blackglory/prelude'
import { expectedVersion } from '@src/utils.js'

interface IInfo {
  namespace: string
  items: number
}

export interface IEStoreClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

export interface IEStoreClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export interface IEStoreClientRequestOptionsWithoutToken {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class EStoreClient {
  constructor(private options: IEStoreClientOptions) {}

  private getCommonTransformers(
    options: IEStoreClientRequestOptions | IEStoreClientRequestOptionsWithoutToken
  ): Array<IRequestOptionsTransformer | Falsy> {
    const token = 'token' in options
                  ? (options.token ?? this.options.token)
                  : this.options.token
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }

  /**
   * @throws {AbortError}
   */
  async append<T>(
    namespace: string
  , itemId: string
  , payload: T
  , index?: number
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}/events`)
    , isntUndefined(index) && header('If-Match', `${index}`)
    , json(payload)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async getEvent<T>(
    namespace: string
  , itemId: string
  , index: number
  , options: IEStoreClientRequestOptions = {}
  ): Promise<T | undefined> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}/events/${index}`)
    )

    try {
      return await fetch(req)
        .then(ok)
        .then(toJSON) as T
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async getEvents<T>(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<T[] | undefined> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}/events`)
    )

    try {
      return await fetch(req)
        .then(ok)
        .then(toJSON) as T[]
    } catch (e) {
      if (e instanceof NotFound) return undefined
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async getSize(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<number> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}/size`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as number
  }

  /**
   * @throws {AbortError}
   */
  async has(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<boolean> {
    const req = head(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}`)
    )

    try {
      await fetch(req).then(ok)
      return true
    } catch (e) {
      if (e instanceof NotFound) return false
      throw e
    }
  }

  /**
   * @throws {AbortError}
   */
  async del(
    namespace: string
  , itemId: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items/${itemId}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async clear(
    namespace: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async getAllItemIds(
    namespace: string
  , options: IEStoreClientRequestOptions = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/items`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getAllNamespaces(
    options: IEStoreClientRequestOptionsWithoutToken = {}
  ): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/estore')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async stats(
    namespace: string
  , options: IEStoreClientRequestOptionsWithoutToken = {}
  ): Promise<IInfo> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/estore/${namespace}/stats`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IInfo
  }
}
