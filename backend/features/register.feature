Feature: Cadastro de Usuário

  Scenario: Cadastro com dados válidos
    Given que o usuário acessa a página de cadastro
    When ele envia os dados de cadastro
    Then ele deve ver a mensagem "Usuário criado com sucesso!"