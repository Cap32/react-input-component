# react-input-component

[![CircleCI](https://circleci.com/gh/Cap32/react-input-component.svg?style=shield)](https://circleci.com/gh/Cap32/react-input-component) [![Build Status](https://travis-ci.org/Cap32/react-input-component.svg?branch=master)](https://travis-ci.org/Cap32/react-input-component)

🚀 A better alternative to react built-in input components


## Motivations

1. Before use built-in react inputs, you may need to know what the hell are [controlled and uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
2. Controlled input has a [bug](https://github.com/facebook/react/issues/3926)
3. Controlled input is slow
4. Uncontrolled input is not powerful


## Installation

```bash
$ yarn add react-input-component
```


## Usages

Just like built-in input components, but no `defaultValue` prop.

###### Example

```js
import React from 'react';
import { Input } from 'react-input-component';

export default () =>
    <Input value="no matter it's controlled or not, it just works as expected" />
```


###### Components

- Input
- TextArea
- Select


## Notes

- Likewise, `<Input type="checkbox" />` and `<Input type="radio" />` only support `checked`, but not `defaultChecked`
- To get the DOM, use `findDOMNode(input)` or `input.dom`. (This `input` refs to an `Input` instance, like `<Input ref="input" />`)
- DOM value could be changed by user typing without updating `state` or `props`


## Caveat

If `value` prop didn't changed, Input component would not re-render. So if you want to reset value by passing the prev `value`, it won't be updated.

```js
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import { Input } from 'react-input-component';

class DemoReset extends Component {
    state = { value: 'a' };

    componentDidMount() {
        findDOMNode(this).value = 'b'; // Simulate user typing

        // Try to reset `value` to "a"
        // It won't be updated because the new `value` equals the prev `value`
        this.setState({ value: 'a' }); // => BAD
    }

    render() {
        return (<Input {...this.state} />);
    }
}

render(<DemoReset />, document.getElementById('root'));
```

To resolve this problem, you could change the DOM value directly, or add a special `updateKey` prop.

`updateKey` helps Input component to decide to update. If `updateKey` changes, the DOM value would change.

```js
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import { Input } from 'react-input-component';

class DemoReset extends Component {
    state = { value: 'a' };

    componentDidMount() {
        findDOMNode(this).value = 'b'; // Simulate user typing

        // Try to reset `value` to "a"
        // Adding a new `updateKey` to force upate
        this.setState({ value: 'a', updateKey: Math.rondom() }); // => GOOD
    }

    render() {
        return (<Input {...this.state} />);
    }
}

render(<DemoReset />, document.getElementById('root'));
```


## License

MIT © Cap32
