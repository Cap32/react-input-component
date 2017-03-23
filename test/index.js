
import React from 'react';
import assert from 'assert';
import jsdom from 'jsdom';
import { mount } from 'enzyme';
import { Input, TextArea, Select } from '../src';

describe('react-input-component', function () {
	beforeEach(() => {
		global.document = jsdom.jsdom(
			'<!doctype html><html><body></body></html>'
		);
		if (typeof window === 'undefined') {
			global.window = global.document.defaultView;
			global.navigator = global.window.navigator;
		}
	});

	it('<Input />', function () {
		const text = 'hello world';
		const wrapper = mount(<Input value={text} />);
		assert.equal(wrapper.find('input').get(0).value, text);
	});

	it('update value', function () {
		const prevValue = 'hello world';
		const nextValue = 'awesome';
		const wrapper = mount(<Input value={prevValue} />);

		assert.equal(wrapper.find('input').get(0).value, prevValue);
		wrapper.setProps({ value: nextValue });
		assert.equal(wrapper.find('input').get(0).value, nextValue);
	});

	it('<Input type="checkbox" />', function () {
		const prevValue = false;
		const nextValue = true;
		const wrapper = mount(<Input type="checkbox" checked={prevValue} />);

		assert.equal(wrapper.find('input').get(0).checked, prevValue);
		wrapper.setProps({ checked: nextValue });
		assert.equal(wrapper.find('input').get(0).checked, nextValue);
	});

	it('<Input type="radio" />', function () {
		const prevValue = false;
		const nextValue = true;
		const wrapper = mount(<Input type="radio" checked={prevValue} />);

		assert.equal(wrapper.find('input').get(0).checked, prevValue);
		wrapper.setProps({ checked: nextValue });
		assert.equal(wrapper.find('input').get(0).checked, nextValue);
	});

	it('<TextArea />', function () {
		const prevValue = 'hello world';
		const nextValue = 'awesome';
		const wrapper = mount(<TextArea value={prevValue} />);

		assert.equal(wrapper.find('textarea').get(0).value, prevValue);
		wrapper.setProps({ value: nextValue });
		assert.equal(wrapper.find('textarea').get(0).value, nextValue);
	});

	it('<Select />', function () {
		const prevValue = '0';
		const nextValue = '1';
		const wrapper = mount(
			<Select value={prevValue}>
				<option value="0" />
				<option value="1" />
			</Select>
		);

		assert.equal(wrapper.find('select').get(0).value, prevValue);
		wrapper.setProps({ value: nextValue });
		assert.equal(wrapper.find('select').get(0).value, nextValue);
	});

	it('fail to update value if `prevValue` equals `nextValue`', function () {
		const prevValue = 'hello world';
		const nextValue = prevValue;
		const wrapper = mount(<Input value={prevValue} />);

		const dom = wrapper.find('input').get(0);

		assert.equal(dom.value, prevValue);

		// simulate user typing
		dom.value = 'updated';

		wrapper.setProps({ value: nextValue });
		assert.notEqual(dom.value, nextValue); // notEqual
	});

	it('success to update value by providing a new `updateKey`', function () {
		const prevValue = 'hello world';
		const nextValue = prevValue;
		const wrapper = mount(<Input value={prevValue} />);

		const dom = wrapper.find('input').get(0);

		assert.equal(dom.value, prevValue);

		// simulate user typing
		dom.value = 'updated';

		wrapper.setProps({ value: nextValue, updateKey: Math.random() });
		assert.equal(dom.value, nextValue); // equal
	});

});
