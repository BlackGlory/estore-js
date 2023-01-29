import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IEStoreManagerRequestOptions, EStoreManagerBase } from './base.js'

interface ITokenInfo {
  token: string
  write: boolean
  read: boolean
  delete: boolean
}

export class TokenManager extends EStoreManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/estore-with-tokens')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getTokens(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  /**
   * @throws {AbortError}
   */
  async addWriteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeWriteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/write`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async addReadToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReadToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/read`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async addDeleteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/delete`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeDeleteToken(
    namespace: string
  , token: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/tokens/${token}/delete`)
    )

    await fetch(req).then(ok)
  }
}
