import { test, expect } from '@playwright/test';

test('healthcheck', async ({ request }) => {
  const response = await request.get('/api/health');

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.message).toBe('Healthy');
});
