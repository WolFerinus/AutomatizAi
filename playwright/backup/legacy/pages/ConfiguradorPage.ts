import { Page, Locator, expect } from '@playwright/test';

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

/**
 * Page Object: Configurador de Veículo
 * Rota: /configure
 *
 * Responsável por encapsular todos os localizadores e ações
 * da página de configuração do Velô Sprint.
 */
export class ConfiguradorPage {
  readonly page: Page;

  // -- Localizadores: Cabeçalho --
  readonly tituloVeloSprint: Locator;

  // -- Localizadores: Imagem do carro --
  readonly imagemDoCarro: Locator;

  // -- Localizadores: Seção de Rodas --
  readonly botaoAeroWheels: Locator;
  readonly botaoSportWheels: Locator;

  // -- Localizadores: Seção de Opcionais --
  readonly checkboxPrecisionPark: Locator;
  readonly checkboxFluxCapacitor: Locator;

  // -- Localizadores: Preço e CTA --
  readonly labelPrecoDePedido: Locator;
  readonly valorPreco: Locator;
  readonly botaoMonteOSeu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.tituloVeloSprint = page.getByRole('heading', { name: 'Velô Sprint', level: 1 });

    // A imagem do carro é identificada pelo alt text que contém "Velô Sprint -"
    this.imagemDoCarro = page.getByRole('img', { name: /Velô Sprint -/ });

    this.botaoAeroWheels = page.getByRole('button', { name: /Aero Wheels/ });
    this.botaoSportWheels = page.getByRole('button', { name: /Sport Wheels/ });

    this.checkboxPrecisionPark = page.getByRole('checkbox', {
      name: /Precision Park/,
    });
    this.checkboxFluxCapacitor = page.getByRole('checkbox', {
      name: /Flux Capacitor/,
    });

    this.labelPrecoDePedido = page.getByText('Preço de Venda');
    // valorPreco é um localizador de conveniência para o CT02 (preço base)
    this.valorPreco = page.locator('text=R$ 40.000,00').last();
    this.botaoMonteOSeu = page.getByRole('button', { name: 'Monte o Seu' });
  }

  /**
   * Navega para a página do Configurador.
   */
  async goto(): Promise<void> {
    await this.page.goto('/configure');
  }

  /**
   * Retorna o texto do preço de venda exibido na tela.
   */
  async getPrecoDeVendaTexto(): Promise<string> {
    // O preço de venda está fixo no rodapé do painel de configuração
    // Identificado via snapshot: generic com texto 'R$ 40.000,00' adjacente a 'Preço de Venda'
    const precoLocator = this.page.locator('text=Preço de Venda').locator('..').getByText(/R\$/);
    return precoLocator.textContent() ?? '';
  }

  /**
   * Verifica se o checkbox Precision Park está desmarcado.
   */
  async checkboxPrecisionParkEstaDesmarcado(): Promise<void> {
    await expect(this.checkboxPrecisionPark).not.toBeChecked();
  }

  /**
   * Verifica se o checkbox Flux Capacitor está desmarcado.
   */
  async checkboxFluxCapacitorEstaDesmarcado(): Promise<void> {
    await expect(this.checkboxFluxCapacitor).not.toBeChecked();
  }

  /**
   * Verifica se o botão Sport Wheels NÃO está selecionado (estado padrão = Aero Wheels).
   */
  async rodasSportNaoEstaSelecionada(): Promise<void> {
    // Sport Wheels não selecionado = não possui as classes de seleção ativa
    await expect(this.botaoSportWheels).not.toHaveClass(/border-primary/);
  }

  /**
   * Seleciona as Rodas Sport (Sport Wheels) e valida o estado ativo.
   * Incremento de preço: + R$ 2.000,00 sobre o valor base.
   */
  async selecionarSportWheels(): Promise<void> {
    await this.botaoSportWheels.click();
    // Checkpoint: Sport Wheels deve ficar com a classe de seleção ativa
    await expect(this.botaoSportWheels).toHaveClass(/border-primary/);
  }

  /**
   * Seleciona o opcional Precision Park e valida o estado checked.
   * Incremento de preço: + R$ 5.500,00.
   */
  async selecionarPrecisionPark(): Promise<void> {
    await this.checkboxPrecisionPark.click();
    // Checkpoint: checkbox deve estar marcado após o clique
    await expect(this.checkboxPrecisionPark).toBeChecked();
  }

  /**
   * Seleciona o opcional Flux Capacitor e valida o estado checked.
   * Incremento de preço: + R$ 5.000,00.
   */
  async selecionarFluxCapacitor(): Promise<void> {
    await this.checkboxFluxCapacitor.click();
    // Checkpoint: checkbox deve estar marcado após o clique
    await expect(this.checkboxFluxCapacitor).toBeChecked();
  }

  /**
   * Retorna o localizador do preço de venda para qualquer valor formatado.
   * O preço fica no rodapé fixo do painel de configuração.
   * Uso: await expect(configurador.precoDeVenda('R$ 42.000,00')).toBeVisible();
   */
  precoDeVenda(valorFormatado: string): Locator {
    return this.page
      .locator('text=Preço de Venda')
      .locator('..')
      .getByText(valorFormatado);
  }

  /**
   * Seleciona uma cor no painel de configuração clicando no botão correspondente.
   * @param cor - Uma das cores disponíveis: 'Glacier Blue' | 'Midnight Black' | 'Lunar White'
   */
  async selecionarCor(cor: Cor): Promise<void> {
    await this.page.getByRole('button', { name: cor }).click();
    // Checkpoint: o botão da cor selecionada deve estar visível após o clique
    await expect(this.page.getByRole('button', { name: cor })).toBeVisible();
  }

  /**
   * Seleciona as rodas no painel de configuração.
   * @param rodas - 'Aero Wheels' | 'Sport Wheels'
   */
  async selecionarRodas(rodas: Rodas): Promise<void> {
    const botao = rodas === 'Aero Wheels' ? this.botaoAeroWheels : this.botaoSportWheels;
    await botao.click();
    // Checkpoint: o botão selecionado deve ter a classe de estado ativo
    await expect(botao).toHaveClass(/border-primary/);
  }

  /**
   * Valida que a imagem do carro exibida corresponde à combinação de cor e rodas esperada.
   * A imagem é identificada pelo atributo `alt` no formato:
   *   "Velô Sprint - {corSlug} with {rodasSlug}"
   *
   * @param cor   - Cor selecionada no configurador
   * @param rodas - Rodas selecionadas no configurador
   */
  async imagemCorresponde(cor: Cor, rodas: Rodas): Promise<void> {
    const altEsperado = `Velô Sprint - ${COR_SLUG[cor]} with ${RODAS_SLUG[rodas]}`;
    await expect(this.imagemDoCarro).toHaveAttribute('alt', altEsperado);
  }
}
