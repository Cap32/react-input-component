
import React from 'react';
import PropTypes from 'prop-types';

const checkables = ['checkbox', 'radio'];
const ReactComponent = React.PureComponent || React.Component;

const stringOrNumber = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
]);

function createComponent(Component, displayName) {
	const detectIsCheckable = (props) =>
		Component === 'input' && checkables.indexOf(props.type) > -1
	;

	class InputComponent extends ReactComponent {
		static propTypes = {
			value: stringOrNumber,
			checked: PropTypes.bool,
			type: PropTypes.string,
			updateKey: stringOrNumber,
		};

		static displayName = displayName;

		componentDidUpdate(prevProps) {
			const { props } = this;
			const isCheckable = detectIsCheckable(props);
			const key = isCheckable ? 'checked' : 'value';
			const val = props[key];
			if (props.updateKey !== prevProps.updateKey || prevProps[key] !== val) {
				this.dom[key] = val;
			}
		}

		render() {
			const {
				updateKey, // eslint-disable-line no-unused-vars
				value, checked, ...other,
			} = this.props;
			const isCheckable = detectIsCheckable(other);
			const key = isCheckable ? 'defaultChecked' : 'defaultValue';
			const val = isCheckable ? checked : value;
			const attrs = { [key]: val };

			return (
				<Component
					{...other}
					{...attrs}
					ref={(dom) => this.dom = dom}
				/>
			);
		}
	}

	return InputComponent;
}

export const TextArea = createComponent('textarea', 'TextArea');
export const Select = createComponent('select', 'Select');
export const Input = createComponent('input', 'Input');
export default Input;
