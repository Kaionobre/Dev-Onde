import json
from behave import given, when, then
from django.test import Client

@given('que o usuário acessa a página de login')
def step_impl(context):
    context.client = Client()
    print("Acessando página de login...")

@when('ele insere o usuário "{username}" e a senha "{password}"')
def step_impl(context, username, password):
    context.response = context.client.post(
        "/api/auth/login/",
        data=json.dumps({"username": username, "password": password}),
        content_type="application/json"  # ⚠️ Isso garante que os dados sejam enviados como JSON
    )
    print(f"Usuário: {username}, Senha: {password}")

@then('ele deve ver a mensagem "Login realizado com sucesso"')
def step_impl(context):
    response_data = context.response.json()  # Converte a resposta para JSON
    assert "access" in response_data, f"Falha no login: {response_data}"  # Verifica se tem token de acesso

