import { CustomError } from '@blackglory/errors'

export const expectedVersion = '^0.3.0'

export interface IStats {
  namespace: string
  items: number
}

export interface IAPI {
  stats(namespace: string): IStats

  getAllNamespaces(): string[]
  getAllItemIds(namespace: string): string[]
  getAllEvents(namespace: string, itemId: string): string[]

  clearItemsByNamespace(namespace: string): null

  removeItem(namespace: string, itemId: string): null

  /**
   * 获得指定项目内包含的事件数量, 该值等同于下一个事件插入时的索引号.
   * 对于不存在的项目, 它会返回0.
   */
  getItemSize(namespace: string, itemId: string): number

  /**
   * @param nextEventIndex 如果指定, 则会在eventIndex不等于下一个index时抛出EventIndexConflict错误.
   * @throws {EventIndexConflict}
   */
  appendEvent(
    namespace: string
  , itemId: string
  , event: string
  , nextEventIndex?: number
  ): null

  getEvent(
    namespace: string
  , itemId: string
  , eventIndex: number
  ): string | null
}

export class EventIndexConflict extends CustomError {}
