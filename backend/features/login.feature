Feature: Login

  Scenario: Login com credenciais válidas
    Given que o usuário acessa a página de login
    When ele insere o usuário "sormany" e a senha "abc123"
    Then ele deve ver a mensagem "Login realizado com sucesso"
