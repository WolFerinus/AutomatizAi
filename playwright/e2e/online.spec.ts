import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

const getScreenshotPath = (testInfo: any, name: string) => {
  const folder = testInfo.title
    .replace(/[^a-z0-9\s]/gi, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Troca espaços por hífens
    .toLowerCase();
  return `screenshots/${folder}/${name}.png`;
};

test('Web app deve estar online', async ({ page }, testInfo) => {
  await expect(page).toHaveTitle(/Velô by Papito/);
  await page.screenshot({ path: getScreenshotPath(testInfo, 'online') });
});

test.describe('Visibilidade de elementos', () => {
  test('deve exibir o logo no header', async ({ page }, testInfo) => {
    const logo = page.getByTestId('header-logo');
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'logo-visible') });
  });

  test('deve exibir o título principal "Velô Sprint"', async ({ page }, testInfo) => {
    const title = page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' });
    await title.scrollIntoViewIfNeeded();
    await expect(title).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'title-visible') });
  });

  test('deve exibir as estatísticas do veículo na hero', async ({ page }, testInfo) => {
    const hero = page.getByTestId('hero-section');
    await hero.scrollIntoViewIfNeeded();
    await expect(hero.getByText('450')).toBeVisible();
    await expect(hero.getByText('3.2s')).toBeVisible();
    await expect(hero.getByText('500')).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'stats-visible') });
  });

  test('deve exibir a seção de especificações técnicas', async ({ page }, testInfo) => {
    const specs = page.getByTestId('specs-section');
    await specs.scrollIntoViewIfNeeded();
    await expect(specs).toBeVisible();
    await expect(page.getByTestId('spec-card-0')).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'specs-visible') });
  });
});

test.describe('Acesso de links e navegação', () => {
  test('deve navegar para a consulta de pedido pelo header', async ({ page }, testInfo) => {
    const link = page.getByRole('link', { name: 'Consultar Pedido' });
    await link.scrollIntoViewIfNeeded();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'before-click') });
    await link.click();
    await expect(page).toHaveURL(/\/lookup/);
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'after-click') });
  });

  test('deve navegar para a configuração pelo botão do header', async ({ page }, testInfo) => {
    const btn = page.getByTestId('header-cta');
    await btn.scrollIntoViewIfNeeded();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'before-click') });
    await btn.click();
    await expect(page).toHaveURL(/\/configure/);
    await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'after-click') });
  });

  test('deve navegar para a configuração pelo botão da hero', async ({ page }, testInfo) => {
    const btn = page.getByTestId('hero-cta-primary');
    await btn.scrollIntoViewIfNeeded();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'before-click') });
    await btn.click();
    await expect(page).toHaveURL(/\/configure/);
    await page.screenshot({ path: getScreenshotPath(testInfo, 'after-click') });
  });

  test('deve navegar para a configuração pelo botão da seção CTA', async ({ page }, testInfo) => {
    const btn = page.getByTestId('cta-button');
    await btn.scrollIntoViewIfNeeded();
    await page.screenshot({ path: getScreenshotPath(testInfo, 'before-click') });
    await btn.click();
    await expect(page).toHaveURL(/\/configure/);
    await page.screenshot({ path: getScreenshotPath(testInfo, 'after-click') });
  });
});
