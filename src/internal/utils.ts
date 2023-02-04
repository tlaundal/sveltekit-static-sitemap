type AnyFunction = (...args: any) => any;

type PrefixParameter<F extends (...args: any) => any, This, Parameter> =
	(this: This, original: Parameter, ...parameters: Parameters<F>) => ReturnType<F>;
export type OptionalFunctionsWithOriginal<T> = {
	[K in keyof T]?: T[K] extends AnyFunction ? PrefixParameter<T[K], T, T[K]> : never;
};

export function isFunction(func: unknown): func is (...args: unknown[]) => unknown {
	return func instanceof Function;
}

type Truthy = <T>(object: T | false | undefined) => object is T;
export const truthy = (Boolean as unknown) as Truthy;

export function truthyEntries<T extends Record<string, unknown>>(object: T) {
	return Object.entries(object).filter(([, v]) => truthy(v)) as Array<{
		[K in keyof T]-?: [K, T[K]];
	}[keyof T]>;
}

/**
 * Trim the size of the margin on the first line from every line.
 */
export function trimMargin(text: string) {
	if (text.startsWith('\n')) {
		text = text.slice(1);
	}

	text = text.trimEnd();
	const lines = text.split('\n');
	const trimmedFirstLine = lines[0]!.trimStart();
	const margin = lines[0]!.length - trimmedFirstLine.length;

	return lines.map(l => l.slice(Math.max(0, margin)).trimEnd()).join('\n');
}
