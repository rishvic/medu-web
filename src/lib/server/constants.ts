import { CF_PAGES, CF_PAGES_BRANCH } from '$env/static/private';
import { dev } from '$app/environment';

export * from './gitConstants';

// Timestamp of the first commit.
export const DATE_CREATED = '2025-11-07T21:32:14Z';

export const IS_PROD_DEPLOYMENT = !dev && CF_PAGES === '1' && CF_PAGES_BRANCH === 'main';
