import { server } from '@test/estore.mock'
import { EStoreClient } from '@src/estore-client'
import { TOKEN } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('EStoreClient', () => {
  test('append(namespace: string, itemId: string, payload: string, index?: number): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = client.append(namespace, id, 'message')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  describe(`
    getEvent(
      namespace: string
    , id: string
    , index: number
    ): Promise<{ revision: string; payload: Json } | undefined>
  `, () => {
    describe('exist', () => {
      it('return event', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getEvent(namespace, 'id', 0)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual('event')
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getEvent(namespace, 'id', 1)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
      })
    })
  })

  describe('getEvents(namespace: string, itemId: string): Promise<Json[]>', () => {
    describe('exist', () => {
      it('return events', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getEvents(namespace, 'id')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual(['event'])
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getEvents(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeUndefined()
      })
    })
  })

  test('getSize(namespace: string, itemId: string): Promise<number>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getSize(namespace, 'id')
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBe(1)
  })

  describe('has(namespace, string, itemId: string): Promise<boolean>', () => {
    describe('exist', () => {
      it('return true', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 'id')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('not exist', () => {
      it('return false', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 'not-found')
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(false)
      })
    })
  })

  test('del(namespace: string, itemId: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = client.del(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.clear(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('stats(namespace: string): Promise<{ namespace: string; items: number }>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.stats(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      namespace
    , items: 1
    })
  })
})

function createClient() {
  return new EStoreClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
