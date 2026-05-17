import { test, expect } from '@playwright/test';

///AAA - Arrange, Act, Assert

test.beforeEach(async ({ page }) => {
    //Arrange - Preparar o cenário, definir as variáveis
    await page.goto('http://localhost:5173/');
});

test('Deve consultar um pedido aprovado', async ({ page }) => {
    //Arrange - Preparar o cenário, definir as variáveis
    const orderId = "VLO-3IS83F";
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    //Act - Agir, interagir com a página
    await expect(page.getByTestId('search-order-id')).toBeVisible();
    await page.getByTestId('search-order-id').fill(orderId);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert - Verificar o resultado
    const cabecalhoPedido = page.getByRole('paragraph').filter({ hasText: new RegExp('^Pedido$') }).locator('..');
    await expect(cabecalhoPedido).toBeVisible({ timeout: 6000 });
    await expect(cabecalhoPedido).toContainText(orderId);
    await expect(page.getByText('APROVADO')).toBeVisible();
});


