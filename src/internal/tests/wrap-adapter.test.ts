import test from 'ava';
import type {Builder, Adapter} from '@sveltejs/kit/types';
import {wrapAdapter} from '../wrap-adapter.js';

test('wrap-adapter wraps an adapter', t => {
	const builder: Partial<Builder> = {
		getClientDirectory() {
			return 'client';
		},
	};

	const adapter: Adapter = {
		name: 'original',
		adapt(builder) {
			t.is(builder.getClientDirectory(), 'client in test');
		},
	};

	const wrapped = wrapAdapter(adapter, '%s + test', {
		getClientDirectory(original) {
			return original() + ' in test';
		},
	});

	t.plan(2);
	t.is(wrapped.name, 'original + test');
	return wrapped.adapt(builder as any);
});
