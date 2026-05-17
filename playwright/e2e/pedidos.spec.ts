import { test, expect } from '@playwright/test';

///AAA - Arrange, Act, Assert


test('Deve consultar um pedido aprovado', async ({ page }) => {
    //Arrange - Preparar o cenário, definir as variáveis
    const orderId = 'VLO-3IS83F';
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    //Act - Agir, interagir com a página
    await expect(page.getByTestId('search-order-id')).toBeVisible();
    await page.getByTestId('search-order-id').fill(orderId);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert - Verificar o resultado
    await expect(page.getByTestId(`order-result-${orderId}`)).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId(`order-result-${orderId}`)).toContainText(orderId);
    await expect(page.getByTestId(`order-result-${orderId}`)).toBeVisible();
    await expect(page.getByTestId(`order-result-${orderId}`)).toContainText('APROVADO');
});


