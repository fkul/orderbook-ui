# react-cf-ws-api

React WebSocket API for Crypto Facilities.

## Getting started

```sh
yarn add @fkul/react-cf-ws-api
```

## Interface

```ts
type CfWs = {
  subscribePub(
    feed: string,
    products: string[],
    callback: (data?: any) => void
  ): void
  unsubscribePub(feed: string, products: string[]): void
  getSubscriptionStatus(feed: string): string | null
}
```

- `subscribePub` - subscribes to a public feed
- `unsubscribePub` - unsubscribes from a public feed
- `updateSubscription` - updates an existing subscription
- `getSubscriptionStatus` - gets the status of a subscription

## Example

```js
import { useCfWs } from '@fkul/react-cf-ws-api';

const Component = () => {
  const ws = useCfWs()

  // the callback function
  const onFeedData = (data) => {}

  // subscribe
  ws.subscribePub("some_feed_name", ["som_product_id"], onFeedData)

  return <></>
}

export default Component
```

## Building

```sh
yarn build
```

## Testing

```sh
yarn test
```
