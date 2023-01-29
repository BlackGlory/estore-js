import { IRequestOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth, header } from 'extra-request/transformers/index'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import type { IEStoreManagerOptions } from './index.js'
import { Falsy } from 'justypes'
import { expectedVersion } from '@src/utils.js'

export interface IEStoreManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class EStoreManagerBase {
  constructor(private options: IEStoreManagerOptions) {}

  protected getCommonTransformers(
    options: IEStoreManagerRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
    return [
      url(this.options.server)
    , bearerAuth(this.options.adminPassword)
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
}
