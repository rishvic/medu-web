export interface SpringEngine<T> {
	step(t: number): void;
	position: T;
}
