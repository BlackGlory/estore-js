import { EStoreClient } from '@src/estore-client.js'

const server = 'ws://estore:8080'

describe('EStoreClient', () => {
  test('appendEvent, getEvent', async () => {
    const client = await EStoreClient.create({ server })

    try {
      await client.appendEvent('namespace', 'item-id', 'event')
      const result = await client.getEvent('namespace', 'item-id', 0)

      expect(result).toBe('event')
    } finally {
      await client.clearItemsByNamespace('namespace')
      await client.close()
    }
  })
})
