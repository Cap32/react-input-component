
import React, { Component, PropTypes } from 'react';
import warning from 'warning';

function createComponent(Comp, displayName) {
	return class FastInput extends Component {
		static propTypes = {
			value: PropTypes.oneOfType([
				PropTypes.number,
				PropTypes.string,
			]),
			inputId: PropTypes.string,
		};

		static displayName = displayName;

		componentWillUpdate({ value, inputId }) {
			const { props } = this;

			warning(

				process.env.NODE_ENV === 'production' ||
				props.value === value ||
				(inputId && props.inputId !== inputId),

				'FastInput received a new value, ' +
				'but it would NOT be updated, ' +
				'unless you provide a new `inputId` prop.'

			);
		}

		render() {
			const { value, inputId, ...other } = this.props;
			return (
				<input {...other} defaultValue={value} key={inputId} />
			);
		}
	};
}

const Input = createComponent('input', 'FastInput');

export default Input;
export const FastTextArea = createComponent('textarea', 'FastTextArea');
export const FastInput = Input;
