
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export function createComponent(Comp, displayName) {
	return class FastInput extends Component {
		static propTypes = {
			value: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.string,
			]),
		};

		static displayName = displayName;

		componentDidMount() {
			this.domNode = findDOMNode(this);
		}

		componentWillReceiveProps({ value }) {
			if (this.props.value !== value) {
				this.domNode.value = value;
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

const Input = createComponent('input', 'FastInput');

export default Input;
export const FastInput = Input;
export const FastTextArea = createComponent('textarea', 'FastTextArea');
