
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export function createComponent(Comp, displayName) {
	return class Input extends Component {
		static propTypes = {
			value: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.string,
			]),
		};

		static displayName = displayName;

		componentWillReceiveProps({ value }) {
			if (this.props.value !== value) {
				(this.dom = this.dom || findDOMNode(this)).value = value;
			}
		}

		render() {
			const { value, ...other } = this.props;
			return (
				<Comp {...other} defaultValue={value} />
			);
		}
	};
}

export const TextArea = createComponent('textarea', 'TextArea');
export const Select = createComponent('select', 'Select');
export const Input = createComponent('input', 'Input');
export default Input;
