import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from '@test/utils'

export const server = setupServer(
  rest.post('/estore/namespace/items/id/events', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.get('/estore/namespace/items/id/events/0', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json('event')
    )
  })

, rest.get('/estore/namespace/items/id/events/1', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(404))
  })

, rest.get('/estore/namespace/items/id/events', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['event'])
    )
  })

, rest.get('/estore/namespace/items/not-found/events', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(404))
  })

, rest.get('/estore/namespace/items/id/size', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(1)
    )
  })

, rest.head('/estore/namespace/items/id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.head('/estore/namespace/items/not-found', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(404))
  })

, rest.delete('/estore/namespace/items/id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/estore/namespace', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.get('/estore/namespace/items', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/estore', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })

, rest.get('/estore/namespace/stats', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json({
        namespace: 'namespace'
      , items: 1
      })
    )
  })

)
