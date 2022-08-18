import { test, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';
import { getPath } from './getPath.js';

    const html = await readFile('./index.html', { encoding: 'utf8' });
    const jsDom = new JSDOM(html, { runScripts: 'dangerously' });

test('getPath test 1', async () => {
    const $element = jsDom.window.document.getElementById('test-1');
    expect($element).toBeTruthy();

    const selector = getPath($element);
    expect(selector).toBe('body div.test-class-container ul.test-class-list li#test-1');

    const element = jsDom.window.document.querySelector(selector);
    expect(element).toBeTruthy();

    const elements = jsDom.window.document.querySelectorAll(selector);
    expect(elements).toHaveLength(1);

});

test('getPath test 2', async () => {
    const $element = jsDom.window.document.querySelector('.test-class-list li:nth-child(2)');
    expect($element).toBeTruthy();

    const selector = getPath($element);
    expect(selector).toBe('body div.test-class-container ul.test-class-list li.test-class:nth-child(2)');

    const element = jsDom.window.document.querySelector(selector);
    expect(element).toBeTruthy();

    const elements = jsDom.window.document.querySelectorAll(selector);
    expect(elements).toHaveLength(1);
});

test('getPath test 3', async () => {
    const $element = jsDom.window.document.querySelector('.test-class-list li:last-child');
    expect($element).toBeTruthy();

    const selector = getPath($element);
    expect(selector).toBe('body div.test-class-container ul.test-class-list li.test-class:last-child');

    const element = jsDom.window.document.querySelector(selector);
    expect(element).toBeTruthy();

    const elements = jsDom.window.document.querySelectorAll(selector);
    expect(elements).toHaveLength(1);

});

test('getPath test 4', async () => {

    const wrongSelector = getPath(null);
    expect(wrongSelector).toBe('');

});