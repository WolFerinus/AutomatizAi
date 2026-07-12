import { test, expect } from '../support/fixtures';
import { generateOrderCode } from '../support/helpers';
import { OrderDetails } from '../support/actions/orderLockupActions';

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open();
  });

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-3IS83F',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João M Stone',
        email: 'ed@gmail.com',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
  });

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-LC3JYL',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Eduardo Martins Dos Santos',
        email: 'eduardo6@gmail.com',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
  });

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-5LJO4G',
      status: 'EM_ANALISE',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Biroliro Du Conka',
        email: 'conca@gmai.com',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode();
    await app.orderLockup.searchOrder(order);
    await app.orderLockup.validateOrderNotFound();
  });

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const order = '123456';
    await app.orderLockup.searchOrder(order);
    await app.orderLockup.validateOrderNotFound();
  });

  test('Deve manter o botão e busca desabilitado com campo vazio ou apenas espaços', async ({ app }) => {
    const button = app.orderLockup.elements.searchButton()
    await expect(button).toBeDisabled();

    await app.orderLockup.elements.orderInput().fill('    ');
    await expect(button).toBeDisabled();
  })

});