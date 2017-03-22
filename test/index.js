
import React from 'react';
import assert from 'assert';
import jsdom from 'jsdom';
import { FastInput, FastTextArea } from '../src';

const html = '<!doctype html><html><body></body></html>';
const doc = jsdom.jsdom(html);

global.document = doc;
global.window = doc.defaultView;
global.navigator = global.window.navigator;

const { mount } = require('enzyme');

describe('react-fast-input', function () {
	beforeEach(() => {
		global.document = jsdom.jsdom(html);
	});

	it('basic', function () {
		const text = 'hello world';
		const wrapper = mount(<FastInput value={text} />);
		assert.equal(wrapper.find('input').get(0).value, text);
	});

	it('update value', function () {
		const prevText = 'hello world';
		const nextText = 'awesome';
		const wrapper = mount(<FastInput value={prevText} inputId="0" />);

		assert.equal(wrapper.find('input').get(0).value, prevText);
		wrapper.setProps({ inputId: '1', value: nextText });
		assert.equal(wrapper.find('input').get(0).value, nextText);
	});

	it('update warning', function () {
		const prevText = 'hello world';
		const nextText = 'awesome';
		const wrapper = mount(<FastInput value={prevText} inputId="0" />);

		assert.equal(wrapper.find('input').get(0).value, prevText);

		// it will throw a warning becuase of missing `inputId` prop.
		wrapper.setProps({ value: nextText });

		// NOT equal
		assert.notEqual(wrapper.find('input').get(0).value, nextText);
	});

	it('textrea', function () {
		const prevText = 'hello world';
		const nextText = 'awesome';
		const wrapper = mount(<FastTextArea value={prevText} inputId="0" />);

		assert.equal(wrapper.find('input').get(0).value, prevText);
		wrapper.setProps({ inputId: '1', value: nextText });
		assert.equal(wrapper.find('input').get(0).value, nextText);
	});

});
