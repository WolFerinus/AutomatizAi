import { Page, expect } from '@playwright/test';

/** Cores disponíveis no configurador — mapeadas ao slug usado no alt da imagem. */
export type Cor = 'Glacier Blue' | 'Midnight Black' | 'Lunar White';

/** Rodas disponíveis no configurador — mapeadas ao slug usado no alt da imagem. */
export type Rodas = 'Aero Wheels' | 'Sport Wheels';

/**
 * Mapa de slug de imagem por cor.
 * Formato do alt text: "Velô Sprint - {corSlug} with {rodasSlug}"
 */
const COR_SLUG: Record<Cor, string> = {
  'Glacier Blue': 'glacier-blue',
  'Midnight Black': 'midnight-black',
  'Lunar White': 'lunar-white',
};

const RODAS_SLUG: Record<Rodas, string> = {
  'Aero Wheels': 'aero wheels',
  'Sport Wheels': 'sport wheels',
};

/** Todas as combinações possíveis de cor e rodas para validação visual do veículo. */
export const COMBINACOES_CARRO: Array<{ cor: Cor; rodas: Rodas; descricao: string }> = [
  { cor: 'Glacier Blue', rodas: 'Aero Wheels', descricao: 'Glacier Blue + Aero Wheels' },
  { cor: 'Glacier Blue', rodas: 'Sport Wheels', descricao: 'Glacier Blue + Sport Wheels' },
  { cor: 'Midnight Black', rodas: 'Aero Wheels', descricao: 'Midnight Black + Aero Wheels' },
  { cor: 'Midnight Black', rodas: 'Sport Wheels', descricao: 'Midnight Black + Sport Wheels' },
  { cor: 'Lunar White', rodas: 'Aero Wheels', descricao: 'Lunar White + Aero Wheels' },
  { cor: 'Lunar White', rodas: 'Sport Wheels', descricao: 'Lunar White + Sport Wheels' },
];

export function createConfiguradorActions(page: Page) {
  const tituloVeloSprint = page.getByRole('heading', { name: 'Velô Sprint', level: 1 });
  const imagemDoCarro = page.getByRole('img', { name: /Velô Sprint -/ });
  const botaoAeroWheels = page.getByRole('button', { name: /Aero Wheels/ });
  const botaoSportWheels = page.getByRole('button', { name: /Sport Wheels/ });
  const checkboxPrecisionPark = page.getByRole('checkbox', { name: /Precision Park/ });
  const checkboxFluxCapacitor = page.getByRole('checkbox', { name: /Flux Capacitor/ });
  const labelPrecoDePedido = page.getByText('Preço de Venda');

  const actions = {
    elements: {
      tituloVeloSprint: () => tituloVeloSprint,
      imagemDoCarro: () => imagemDoCarro,
      botaoAeroWheels: () => botaoAeroWheels,
      botaoSportWheels: () => botaoSportWheels,
      checkboxPrecisionPark: () => checkboxPrecisionPark,
      checkboxFluxCapacitor: () => checkboxFluxCapacitor,
      labelPrecoDePedido: () => labelPrecoDePedido,
      precoDeVenda: (valorFormatado: string) =>
        page.locator('text=Preço de Venda').locator('..').getByText(valorFormatado),
    },

    async open() {
      await page.goto('/configure');
      await expect(tituloVeloSprint).toBeVisible();
    },

    async validateDefaultConfiguration() {
      await expect(checkboxPrecisionPark).not.toBeChecked();
      await expect(checkboxFluxCapacitor).not.toBeChecked();
      await expect(botaoSportWheels).not.toHaveClass(/border-primary/);
      await expect(botaoAeroWheels).toHaveClass(/border-primary/);
      await expect(labelPrecoDePedido).toBeVisible();
      await expect(page.getByText('R$ 40.000,00').last()).toBeVisible();
      await expect(page.getByText('R$ 40.000,00').last()).toContainText('40.000,00');
    },

    async selectWheels(rodas: Rodas) {
      const botao = rodas === 'Aero Wheels' ? botaoAeroWheels : botaoSportWheels;
      await botao.click();
      await expect(botao).toHaveClass(/border-primary/);
    },

    async selectPrecisionPark() {
      await checkboxPrecisionPark.click();
      await expect(checkboxPrecisionPark).toBeChecked();
    },

    async selectFluxCapacitor() {
      await checkboxFluxCapacitor.click();
      await expect(checkboxFluxCapacitor).toBeChecked();
    },

    async selectColor(cor: Cor) {
      const botaoCor = page.getByRole('button', { name: cor });
      await botaoCor.click();
      await expect(botaoCor).toBeVisible();
    },

    async validatePrice(valorFormatado: string) {
      await expect(page.getByText(valorFormatado).last()).toBeVisible();
    },

    async validateAllOptionsSelected() {
      await expect(checkboxPrecisionPark).toBeChecked();
      await expect(checkboxFluxCapacitor).toBeChecked();
      await expect(botaoSportWheels).toHaveClass(/border-primary/);
    },

    async validateCarImage(cor: Cor, rodas: Rodas) {
      const altEsperado = `Velô Sprint - ${COR_SLUG[cor]} with ${RODAS_SLUG[rodas]}`;
      await expect(imagemDoCarro).toHaveAttribute('alt', altEsperado);
    },
  };

  return actions;
}
