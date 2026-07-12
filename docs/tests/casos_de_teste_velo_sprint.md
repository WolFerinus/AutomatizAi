# Casos de Teste - Velô Sprint

## Informações do Sistema
**Nome do sistema:** Velô Sprint - Configurador de Veículo Elétrico

---

### CT01 - Acesso à Landing Page e Navegação para o Configurador
#### Objetivo
Validar que o usuário consegue acessar a Landing Page e navegar para o Configurador de Veículo.

#### Pré-Condições

- O sistema deve estar acessível e online.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a URL raiz do sistema | A Landing Page é exibida com as informações do veículo |
| 2 | Clicar no botão para iniciar a configuração do veículo | O sistema redireciona o usuário para a tela do Configurador |

#### Resultados Esperados

- O usuário deve conseguir visualizar a Landing Page corretamente e ser redirecionado para a página de configuração do veículo sem erros.

#### Critérios de Aceitação

- A Landing Page carrega corretamente.
- O botão de "Configurar" ou similar está visível e funcional.

---

### CT02 - Configuração Básica do Veículo (Sem Opcionais)
#### Objetivo
Validar que o preço do veículo é exibido corretamente quando nenhum opcional é selecionado.

#### Pré-Condições

- Estar na página do Configurador de Veículo.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Não selecionar nenhum opcional (Rodas Sport, Precision Park, Flux Capacitor) | Os checkboxes ou opções devem estar desmarcados |
| 2 | Observar o valor total exibido na tela | O valor total exibido deve ser exatamente R$ 40.000 |

#### Resultados Esperados

- O sistema deve calcular o valor base de R$ 40.000 sem acréscimos.

#### Critérios de Aceitação

- O valor base do carro é R$ 40.000.
- Nenhuma seleção extra implica em não adicionar valores.

---

### CT03 - Configuração do Veículo com Opcionais Selecionados
#### Objetivo
Validar a regra de negócio de precificação ao adicionar opcionais ao veículo.

#### Pré-Condições

- Estar na página do Configurador de Veículo.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar o opcional "Rodas Sport" | O valor total é atualizado para R$ 42.000 (40k + 2k) |
| 2 | Selecionar o opcional "Precision Park" | O valor total é atualizado para R$ 47.500 (42k + 5.5k) |
| 3 | Selecionar o opcional "Flux Capacitor" | O valor total é atualizado para R$ 52.500 (47.5k + 5k) |

#### Resultados Esperados

- O preço total do veículo deve ser atualizado dinamicamente em tempo real para R$ 52.500.

#### Critérios de Aceitação

- A soma dos valores dos opcionais selecionados deve refletir perfeitamente as regras de negócio de precificação.

---

### CT04 - Preenchimento do Checkout/Pedido (Pagamento à Vista)
#### Objetivo
Validar o fluxo feliz de compra com pagamento à vista.

#### Pré-Condições

- Ter configurado um veículo.
- Estar na página de Checkout/Pedido.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Preencher todos os campos obrigatórios (Nome, CPF, etc.) corretamente | Os campos são aceitos sem erros de validação |
| 2 | Selecionar a opção de pagamento "À vista" | A opção é selecionada e não há cálculo de parcelamento |
| 3 | Clicar em "Finalizar Pedido" | O sistema processa o pedido e redireciona para a Confirmação |

#### Resultados Esperados

- Pedido realizado com sucesso com o valor total calculado sem incidência de juros.

#### Critérios de Aceitação

- O sistema permite avançar com todos os campos obrigatórios preenchidos.
- O pagamento à vista não aplica taxa de juros.

---

### CT05 - Preenchimento do Checkout/Pedido com Campos Obrigatórios Faltantes
#### Objetivo
Validar se o sistema impede a finalização do pedido sem o preenchimento de campos obrigatórios.

#### Pré-Condições

- Ter configurado um veículo.
- Estar na página de Checkout/Pedido.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar de preencher o campo "CPF" (obrigatório) | O campo deve continuar vazio |
| 2 | Clicar em "Finalizar Pedido" | O sistema exibe uma mensagem de erro indicando que o CPF é obrigatório |

#### Resultados Esperados

- O sistema não deve permitir o avanço para a próxima etapa e deve destacar visualmente o campo que falta.

#### Critérios de Aceitação

- Mensagens de erro de validação devem ser exibidas.
- A requisição para salvar o pedido não deve ser enviada.

---

### CT06 - Checkout com Financiamento (Juros Compostos)
#### Objetivo
Validar o cálculo de juros de financiamento em 12x (taxa fixa de 2% a.m.).

#### Pré-Condições

- Estar na página de Checkout/Pedido.
- Ter configurado um veículo sem entrada.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de pagamento "Parcelado" ou "Financiado" | A opção de 12x com juros é exibida |
| 2 | Informar 0% (ou sem) valor de entrada | O sistema calcula o valor financiado sobre o valor total do veículo |
| 3 | Observar o valor das parcelas e valor total a prazo | O sistema exibe o valor da parcela com juros compostos de 2% ao mês sobre o saldo devedor por 12 meses |

#### Resultados Esperados

- O valor da parcela e o valor total devem refletir a fórmula matemática de juros compostos exatos.

#### Critérios de Aceitação

- Apenas 12 parcelas são permitidas.
- A taxa de 2% é aplicada corretamente no modelo composto.

---

### CT07 - Análise de Crédito - Score Aprovado
#### Objetivo
Validar se a análise de crédito aprova automaticamente um cliente com score > 700.

#### Pré-Condições

- Estar preenchendo o Checkout.
- Cliente deve ter score superior a 700 na API (mock).
- Valor de entrada inferior a 50%.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Preencher os dados do cliente com Score alto e enviar o pedido | O sistema envia a requisição de pedido |
| 2 | Aguardar o redirecionamento ou status do pedido na tela de Confirmação | O status do pedido é exibido como "Aprovado" |

#### Resultados Esperados

- O pedido deve ser finalizado e aprovado imediatamente pelo score do cliente.

#### Critérios de Aceitação

- Score > 700 resulta em aprovação.

---

### CT08 - Análise de Crédito - Score Em Análise
#### Objetivo
Validar se a análise de crédito deixa em análise um cliente com score entre 501 e 700.

#### Pré-Condições

- Estar preenchendo o Checkout.
- Cliente deve ter score entre 501 e 700.
- Valor de entrada inferior a 50%.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Preencher os dados e finalizar o pedido | O sistema envia a requisição de pedido |
| 2 | Observar o status na tela de Confirmação | O status do pedido é exibido como "Em Análise" ou similar |

#### Resultados Esperados

- O pedido é registrado, mas o status não é aprovado, dependendo de avaliação posterior.

#### Critérios de Aceitação

- Score entre 501 e 700 resulta em status "Em Análise".

---

### CT09 - Análise de Crédito - Score Reprovado
#### Objetivo
Validar se a análise de crédito reprova o cliente com score <= 500.

#### Pré-Condições

- Estar preenchendo o Checkout.
- Cliente deve ter score <= 500.
- Valor de entrada inferior a 50%.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Preencher os dados e finalizar o pedido | O sistema envia a requisição de pedido |
| 2 | Observar o status na tela de Confirmação | O status do pedido é exibido como "Reprovado" |

#### Resultados Esperados

- O pedido deve ser rejeitado em virtude do score de crédito.

#### Critérios de Aceitação

- Score <= 500 resulta em reprovação.

---

### CT10 - Análise de Crédito - Aprovação Automática por Entrada >= 50%
#### Objetivo
Validar a regra de negócio em que uma entrada de no mínimo 50% do valor total ignora o score e aprova o pedido.

#### Pré-Condições

- Estar preenchendo o Checkout com Financiamento.
- Ter configurado o veículo.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Utilizar os dados de um cliente com Score Baixo (<= 500) | Dados preenchidos no formulário |
| 2 | Inserir um valor de entrada que corresponda a 50% ou mais do valor total do veículo configurado | O sistema atualiza o valor a ser financiado |
| 3 | Finalizar o pedido | O sistema processa a solicitação |
| 4 | Observar o status na tela de Confirmação | O status do pedido é exibido como "Aprovado" |

#### Resultados Esperados

- O pedido deve ser aprovado, independentemente de o score de crédito ser considerado reprovado pelas regras padrão.

#### Critérios de Aceitação

- A regra de exceção da entrada prevalece sobre a regra do score de crédito.

---

### CT11 - Consulta de Pedidos com Número Válido
#### Objetivo
Validar se é possível consultar os detalhes de um pedido utilizando o seu número (order_number).

#### Pré-Condições

- Um pedido deve ter sido gerado anteriormente.
- O número do pedido (order_number) deve ser conhecido.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a página/módulo de Consulta de Pedidos | Um campo de busca por número do pedido é exibido |
| 2 | Inserir o `order_number` válido | O número é preenchido |
| 3 | Clicar no botão "Buscar" ou "Consultar" | O sistema exibe as informações detalhadas e o status do pedido correspondente |

#### Resultados Esperados

- A página exibe o pedido completo associado ao número informado.

#### Critérios de Aceitação

- O sistema restringe o acesso somente aos pedidos que correspondem ao número fornecido (segurança de dados).

---

### CT12 - Consulta de Pedidos com Número Inválido ou Inexistente
#### Objetivo
Validar o comportamento da consulta de pedidos quando um número não cadastrado ou mal formatado é informado.

#### Pré-Condições

- Estar na página/módulo de Consulta de Pedidos.

#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Inserir um `order_number` que não existe na base de dados (ou vazio) | O número é preenchido (ou permanece vazio) |
| 2 | Clicar no botão "Buscar" ou "Consultar" | O sistema exibe uma mensagem indicando "Pedido não encontrado" ou de validação |

#### Resultados Esperados

- O sistema não deve expor informações de terceiros ou falhar; deve apenas informar de maneira clara que o pedido não foi localizado.

#### Critérios de Aceitação

- O tratamento de erros deve proteger a segurança dos dados e evitar exposição desnecessária.
