import { test as baseTest, request as baseRequest } from '../core/fixture/base-fixture';
import { PageFixtures, pageFixtures } from './page.fixture';
import { ApiFixtures, apiTest } from './api.fixture';

export const testMain = baseTest.extend<ApiFixtures & PageFixtures>({
    ...apiTest,
    ...pageFixtures
})

export const base = baseTest;
export const requestMain = baseRequest;
export const expectMain = base.expect;