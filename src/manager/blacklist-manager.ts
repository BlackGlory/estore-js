import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IEStoreManagerRequestOptions, EStoreManagerBase } from './base.js'

export class BlacklistManager extends EStoreManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IEStoreManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/blacklist')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async add(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/blacklist/${namespace}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async remove(namespace: string, options: IEStoreManagerRequestOptions = {}): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/blacklist/${namespace}`)
    )

    await fetch(req).then(ok)
  }
}
