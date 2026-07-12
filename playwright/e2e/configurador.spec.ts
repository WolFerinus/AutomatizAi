import { test } from '../support/fixtures';
import { COMBINACOES_CARRO } from '../support/actions/configuradorActions';

test.describe('Configurador do Veículo', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurador.open();
  });

  test('CT02 - deve exibir o preço base de R$ 40.000,00 sem nenhum opcional selecionado', async ({
    app,
  }) => {
    await app.configurador.validateDefaultConfiguration();
  });

  test('CT03 - deve atualizar o preço dinamicamente ao selecionar todos os opcionais', async ({
    app,
  }) => {

    await app.configurador.validatePrice('R$ 40.000,00');


    await app.configurador.selectWheels('Sport Wheels');
    await app.configurador.validatePrice('R$ 42.000,00');

    await app.configurador.selectPrecisionPark();
    await app.configurador.validatePrice('R$ 47.500,00');

    await app.configurador.selectFluxCapacitor();
    await app.configurador.validatePrice('R$ 52.500,00');

    await app.configurador.validateAllOptionsSelected();
  });


  for (const { cor, rodas, descricao } of COMBINACOES_CARRO) {
    test(`CT-IMG - deve exibir a imagem correta para: ${descricao}`, async ({ app }) => {
      await app.configurador.selectColor(cor);
      await app.configurador.selectWheels(rodas);

      await app.configurador.validateCarImage(cor, rodas);
    });
  }
});
