import test from 'ava';
import {sitemap} from '.';

test('sitemap is a function', t => {
	t.assert(sitemap instanceof Function);
});
