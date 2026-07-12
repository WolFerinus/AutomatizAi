import { Page, expect } from '@playwright/test'
import { NavbarComponent } from '../components/NavbarComponent'

export class LandingPage {
    readonly navbar: NavbarComponent

    constructor(private page: Page) {
        this.navbar = new NavbarComponent(this.page)
    }

    async goTo() {
        await this.page.goto('/')
        await expect(this.page).toHaveTitle(/Velô by Papito/)
        const title = this.page.getByTestId('hero-section').getByRole('heading')
        await expect(title).toBeVisible()
        await expect(title).toContainText('Velô Sprint')
    }
}
