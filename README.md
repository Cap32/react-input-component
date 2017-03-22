# react-input-component

[![Build Status](https://travis-ci.org/Cap32/react-input-component.svg?branch=master)](https://travis-ci.org/Cap32/react-input-component)

🚀 A better alternative to react built-in input components


## Motivation

1. Before use built-in react inputs, you may need to know what the hell are [controlled and uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
2. Controlled input is slow
3. Controlled input has a [bug](https://github.com/facebook/react/issues/3926)


## Usage

Just like built-in input components, but no `defaultValue` prop.

###### Example:

```js
import React from 'react';
import { Input } from 'react-input-component';

export default () =>
    <Input value="no matter it's controlled or not, it just works as expected" />
```


## Components

- Input
- TextArea
- Select


## Notes

- Likewise, `<Input type="checkbox" />` and `<Input type="radio" />` only support `checked`, but not `defaultChecked`
- To get the DOM, use `findDOMNode(input)` or `input.dom`. (This `input` refs to an Input instance, like `<Input ref="input" />`)
- Different from built-in input components, DOM value could be changed by user typing without updating `state` or `props`


## Installation

```bash
$ yarn add react-input-component
```


## License

MIT © Cap32
