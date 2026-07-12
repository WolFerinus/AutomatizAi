import { Page, expect } from '@playwright/test'

export class NavbarComponent {
    constructor(private page: Page) {}

    async navigateToOrderLookup() {
        await this.page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(this.page.getByRole('heading')).toContainText('Consultar Pedido')
    }

    async navigateToHome() {
        await this.page.getByRole('link', { name: 'Home' }).click()
    }
}
