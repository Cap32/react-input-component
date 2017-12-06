# react-input-component

[![CircleCI](https://circleci.com/gh/Cap32/react-input-component.svg?style=shield)](https://circleci.com/gh/Cap32/react-input-component) [![Build Status](https://travis-ci.org/Cap32/react-input-component.svg?branch=master)](https://travis-ci.org/Cap32/react-input-component)

🚀 A better alternative to react built-in input components


## Motivations

1. Before use built-in react inputs, you may need to know what the hell are [controlled and uncontrolled inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
2. Controlled input has a [bug](https://github.com/facebook/react/issues/3926)
3. Controlled input is slow
4. Uncontrolled input is not powerful

So I created this module to avoid the problems above. 


## Installation

```bash
yarn add react-input-component
```


## Usages

Just like built-in input components, but no `defaultValue` or `defaultChecked` prop.

###### Example

```js
import React from 'react';
import { Input } from 'react-input-component';

export default () =>
    <Input value="feel free to type here..." />
```


###### Components

- Input
- TextArea
- Select


## Notes

- All styles are the same with react built-in inputs
- All react built-in inputs' props are supported, except `defaultValue` and `defaultChecked`
- To get the DOM, use `findDOMNode(input)` or `input.dom`. (This `input` refs to an `Input` instance, like `<Input ref="input" />`)
- Form data (value or checked) would be handled by the DOM itself.
- Form data could also be changed by passing new `value` prop to component.


## Caveat

If the new `value` prop is equal to the prev `value` prop, form data would not be updated, even if form data is not equal to the `value` prop.

```js
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import { Input } from 'react-input-component';

class Bad extends Component {
    state = { value: 'a' };

    componentDidMount() {
        findDOMNode(this).value = 'b'; // Simulate user typing

        // Try to reset `value` to "a", but failed
        // Because the new `value` prop is equal to the prev `value` prop
        this.setState({ value: 'a' }); // => BAD
    }

    render() {
        return (<Input {...this.state} />);
    }
}

render(<Bad />, document.getElementById('root'));
```

To resolve this problem, you could change the DOM value directly, or add a special `updateKey` prop.

`updateKey` helps Input component to decide to update. If `updateKey` changes, form data changes.

```js
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import { Input } from 'react-input-component';

class Good extends Component {
    state = { value: 'a' };

    componentDidMount() {
        findDOMNode(this).value = 'b'; // Simulate user typing

        // Try to reset `value` to "a"
        // Adding a new `updateKey` to force upate
        this.setState({ value: 'a', updateKey: Math.random() }); // => GOOD
    }

    render() {
        return (<Input {...this.state} />);
    }
}

render(<Good />, document.getElementById('root'));
```


## License

MIT © Cap32
