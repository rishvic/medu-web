import type { Thing, WithContext } from 'schema-dts';

export function jsonLd<T extends Thing>(json: WithContext<T>) {
	return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
}
