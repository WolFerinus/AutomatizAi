import { test } from '../support/fixtures';

test('webapp deve estar online', async ({ app }) => {
  await app.orderLockup.open();
});