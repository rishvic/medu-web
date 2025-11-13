import type { SpringEngine } from '$lib/spring';

export type ObjParams = {
	x: number;
	v: number;
};

export type SpringParams = {
	x: number;
	m: number;
	d: number;
	k: number;
};

export type SimParams = {
	tmax?: number;
};

class JsSpringEngine implements SpringEngine<number> {
	_o: ObjParams;
	_s: SpringParams;
	_sp: SimParams;

	constructor(o: ObjParams, s: SpringParams, sp: SimParams) {
		this._o = o;
		this._s = s;
		this._sp = sp;
	}

	step(t: number) {
		if (this._sp.tmax === undefined) {
			this._step(t);
			return;
		}

		while (t > this._sp.tmax) {
			this._step(this._sp.tmax);
			t -= this._sp.tmax;
		}
		this._step(t);
	}

	get position() {
		return this._o.x;
	}

	set springPosition(x: number) {
		this._s.x = x;
	}

	set springDamping(d: number) {
		this._s.d = d;
	}

	_f1(v: number) {
		return v;
	}

	_f2(x: number, v: number) {
		return (-this._s.k * (x - this._s.x) - this._s.d * v) / this._s.m;
	}

	_step(t: number) {
		// Explicit RK4.
		const k1 = this._f1(this._o.v);
		const l1 = this._f2(this._o.x, this._o.v);

		const k2 = this._f1(this._o.v + (t * l1) / 2);
		const l2 = this._f2(this._o.x + (t * k1) / 2, this._o.v + (t * l1) / 2);

		const k3 = this._f1(this._o.v + (t * l2) / 2);
		const l3 = this._f2(this._o.x + (t * k2) / 2, this._o.v + (t * l2) / 2);

		const k4 = this._f1(this._o.v + t * l3);
		const l4 = this._f2(this._o.x + t * k3, this._o.v + t * l3);

		this._o.x += (t * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
		this._o.v += (t * (l1 + 2 * l2 + 2 * l3 + l4)) / 6;
	}
}

export default JsSpringEngine;
