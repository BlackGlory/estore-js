import { server } from '@test/client.mock.js'
import { EStoreClient } from '@src/client.js'
import { TOKEN } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('EStoreClient', () => {
  test('append(namespace: string, itemId: string, payload: string, index?: number): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.append(namespace, id, 'message')

    expect(result).toBeUndefined()
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

        const result = await client.getEvent(namespace, 'id', 0)

        expect(result).toStrictEqual('event')
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.getEvent(namespace, 'id', 1)

        expect(result).toBeUndefined()
      })
    })
  })

  describe('getEvents(namespace: string, itemId: string): Promise<Json[]>', () => {
    describe('exist', () => {
      it('return events', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.getEvents(namespace, 'id')

        expect(result).toStrictEqual(['event'])
      })
    })

    describe('not exist', () => {
      it('return undefined', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.getEvents(namespace, 'not-found')

        expect(result).toBeUndefined()
      })
    })
  })

  test('getSize(namespace: string, itemId: string): Promise<number>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getSize(namespace, 'id')

    expect(result).toBe(1)
  })

  describe('has(namespace, string, itemId: string): Promise<boolean>', () => {
    describe('exist', () => {
      it('return true', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.has(namespace, 'id')

        expect(result).toBe(true)
      })
    })

    describe('not exist', () => {
      it('return false', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = await client.has(namespace, 'not-found')

        expect(result).toBe(false)
      })
    })
  })

  test('del(namespace: string, itemId: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 'id'

    const result = await client.del(namespace, id)

    expect(result).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.clear(namespace)

    expect(result).toBeUndefined()
  })

  test('getAllItemIds(namespace: string): Promise<string[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.getAllItemIds(namespace)

    expect(result).toStrictEqual(['id'])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('stats(namespace: string): Promise<{ namespace: string; items: number }>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.stats(namespace)

    expect(result).toStrictEqual({
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
