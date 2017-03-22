
import React, { Component, PropTypes } from 'react';

const checkables = ['checkbox', 'radio'];
const ReactComponent = React.PureComponent || Component;

export function createComponent(Comp, displayName) {
	const detectIsCheckable = (props) =>
		Comp === 'input' && checkables.indexOf(props.type) > -1
	;

	return class Input extends ReactComponent {
		static propTypes = {
			value: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.string,
			]),
			checked: PropTypes.bool,
			type: PropTypes.string,
		};

		static displayName = displayName;

		componentWillReceiveProps(nextProps) {
			const isCheckable = detectIsCheckable(nextProps);
			const key = isCheckable ? 'checked' : 'value';
			const val = nextProps[key];
			if (this.props[key] !== val) {
				this.domNode[key] = val;
			}
		}

		render() {
			const { value, checked, ...other } = this.props;
			const isCheckable = detectIsCheckable(other);
			const key = isCheckable ? 'defaultChecked' : 'defaultValue';
			const val = isCheckable ? checked : value;
			const attrs = { [key]: val };

			return (
				<Comp
					{...other}
					{...attrs}
					ref={(domNode) => this.domNode = domNode}
				/>
			);
		}
	};
}

export const TextArea = createComponent('textarea', 'TextArea');
export const Select = createComponent('select', 'Select');
export const Input = createComponent('input', 'Input');
export default Input;
