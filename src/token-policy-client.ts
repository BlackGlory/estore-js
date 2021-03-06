import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IEStoreManagerRequestOptions, EStoreManagerBase } from './utils'

interface ITokenPolicy {
  writeTokenRequired: boolean | null
  readTokenRequired: boolean | null
  deleteTokenRequired: boolean | null
}

export class TokenPolicyClient extends EStoreManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/estore-with-token-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<ITokenPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  /**
   * @throws {AbortError}
   */
  async setWriteTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/write-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeWriteTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/write-token-required`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setReadTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/read-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeReadTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/read-token-required`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setDeleteTokenRequired(
    namespace: string
  , val: boolean
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/delete-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeDeleteTokenRequired(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/estore/${namespace}/token-policies/delete-token-required`)
    )

    await fetch(req).then(ok)
  }
}
