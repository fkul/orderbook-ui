# Avg

Helps at calculating an average of numbers.

## Getting started

```sh
yarn add @fkul/avg
```

## Interface

```ts
type Avg = {
  add(number: number): void
  get(): number
  getCount(): number
  setMaxCount(count: number): void
  reset(): void
}
```

- `add` - adds a number for calculation
- `get` - gets the calculated average of the previously added numbers
- `getCount` - gets the count of added numbers
- `setMaxCount` - limits the numbers count - adding new numbers will remove the oldest (default: 100)
- `reset` - resets all values to their defaults

## Example

```js
import { useAvg } from '@fkul/avg';

const avg = useAvg();

avg.add(10);
avg.add(30);

const result = avg.get() // 20
```

## Building

```sh
yarn build
```

## Testing

```sh
yarn test
```
