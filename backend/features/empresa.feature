Feature: CRUD de Empresas

  Scenario: Criar uma nova empresa
    Given que o usuário está autenticado
    And que o usuário tem os dados de uma nova empresa
    When ele faz uma requisição POST para criar a empresa
    Then a empresa deve ser criada com sucesso

  Scenario: Editar uma empresa existente
    Given que o usuário está autenticado
    And que existe uma empresa cadastrada
    When ele faz uma requisição PATCH para atualizar a empresa
    Then a empresa deve ser atualizada com sucesso

  Scenario: Deletar uma empresa
    Given que o usuário está autenticado
    And que existe uma empresa cadastrada
    When ele faz uma requisição DELETE para excluir a empresa
    Then a empresa deve ser removida com sucesso
