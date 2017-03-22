# react-input-component

A better alternative to react built-in input components


## Motivation

1. Before you want to use built-in react inputs, you may need to what the hell are [controlled and uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
2. Controlled input is slow
3. Controlled input has [bug](https://github.com/facebook/react/issues/3926)


## Usage

Just like built-in input components, but no `defaultValue` prop.

###### Example:

```js
import React from 'react';
import { Input } from 'react-input-component';

export default () =>
    <Input value="no matter it is controlled or not, it just works." />

```


## License

MIT
