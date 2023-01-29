import { fetch } from 'extra-fetch'
import { JSONValue } from 'justypes'
import { get, put, del } from 'extra-request'
import { appendPathname, json } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IEStoreManagerRequestOptions, EStoreManagerBase } from './base.js'

export class JsonSchemaManager extends EStoreManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/estore-with-json-schema')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<unknown> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/json-schema`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON)
  }

  /**
   * @throws {AbortError}
   */
  async set(
    namespace: string
  , schema: JSONValue
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/json-schema`)
    , json(schema)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(
    namespace: string
  , options: IEStoreManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/estore/${namespace}/json-schema`)
    )

    await fetch(req).then(ok)
  }
}
