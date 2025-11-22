export interface RollupCounterOptions {
	clock?: () => number;
}

export type RollupIncrementer = () => void;

export default function rollupCounter(
	count: number,
	duration: number,
	cb: () => void,
	options?: RollupCounterOptions
): RollupIncrementer {
	if (!Number.isInteger(count) || count < 1) {
		throw new RangeError('`clicks` must be a positive integer');
	}
	const clock = options?.clock ?? Date.now;
	let callTimes: number[] = [];

	return () => {
		const now = clock();

		callTimes = callTimes.filter((callTime) => now - callTime < duration);
		callTimes.push(now);

		if (callTimes.length >= count) {
			cb();
			callTimes = [];
		}
	};
}
