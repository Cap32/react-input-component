
import React from 'react';
import assert from 'assert';
import jsdom from 'jsdom';
import { mount } from 'enzyme';
import { FastInput, FastTextArea } from '../src';

describe('react-fast-input', function () {
	beforeEach(() => {
		global.document = jsdom.jsdom(
			'<!doctype html><html><body></body></html>'
		);
		if (typeof window === 'undefined') {
			global.window = global.document.defaultView;
			global.navigator = global.window.navigator;
		}
	});

	it('basic', function () {
		const text = 'hello world';
		const wrapper = mount(<FastInput value={text} />);
		assert.equal(wrapper.find('input').get(0).value, text);
	});

	it('update value', function () {
		const prevText = 'hello world';
		const nextText = 'awesome';
		const wrapper = mount(<FastInput value={prevText} />);

		assert.equal(wrapper.find('input').get(0).value, prevText);
		wrapper.setProps({ value: nextText });
		assert.equal(wrapper.find('input').get(0).value, nextText);
	});

	it('textrea', function () {
		const prevText = 'hello world';
		const nextText = 'awesome';
		const wrapper = mount(<FastTextArea value={prevText} />);

		assert.equal(wrapper.find('textarea').get(0).value, prevText);
		wrapper.setProps({ value: nextText });
		assert.equal(wrapper.find('textarea').get(0).value, nextText);
	});

});
