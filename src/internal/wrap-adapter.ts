import {format} from 'node:util';
import type {Adapter, Builder} from '@sveltejs/kit/types';
import {type OptionalFunctionsWithOriginal, isFunction, truthyEntries} from './utils.js';

type BuilderWrap = OptionalFunctionsWithOriginal<Builder> & {
	/**
	 * Hook into the adapter's adapt function.
	 *
	 * This method is called right before the original adapt function is called.
	 *
	 * The Builder instance is available as `this`.
	 */
	adapt?: (this: Builder) => void;
};

function wrapBuilder(builder: Builder, builderWrap: BuilderWrap): Builder {
	for (const [key, wrap] of truthyEntries(builderWrap)) {
		if (key === 'adapt' || !isFunction(wrap)) {
			continue;
		}

		const original = builder[key];
		if (!isFunction(original)) {
			continue;
		}

		(builder as any)[key] = (...args: unknown[]) => wrap.apply(builder, [original.bind(builder), ...args]);
	}

	return builder;
}

/**
 * Wrap an existing adapter and adapt the behaviour of the builder
 */
export function wrapAdapter(adapter: Adapter, nameTemplate: string, builderWrap: BuilderWrap): Adapter {
	return {
		...adapter,
		name: format(nameTemplate, adapter.name),
		adapt(builder) {
			builderWrap.adapt?.apply(builder);
			return adapter.adapt(wrapBuilder(builder, builderWrap));
		},
	};
}
