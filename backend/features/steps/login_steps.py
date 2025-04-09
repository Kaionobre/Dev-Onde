import json
from behave import given, when, then
from django.test import Client
from django.contrib.auth import get_user_model  # Importa o CustomUser dinamicamente

User = get_user_model()  # Pega o CustomUser configurado

@given('que o usuário acessa a página de login')
def step_impl(context):
    context.client = Client()

    context.username = "sormany"
    context.password = "abc123"

    # Garante que não existe um usuário duplicado
    if not User.objects.filter(username=context.username).exists():
        User.objects.create_user(username=context.username, password=context.password)
        print("✅ Usuário de teste criado com sucesso!")
    else:
        print("⚠️ Usuário de teste já existe.")

@when('ele insere o usuário "{username}" e a senha "{password}"')
def step_impl(context, username, password):
    context.response = context.client.post(
        "/api/auth/login/",
        data=json.dumps({"username": username, "password": password}),
        content_type="application/json"
    )
    print(f"🧪 Tentando login com -> Usuário: {username}, Senha: {password}")

@then('ele deve ver a mensagem "Login realizado com sucesso"')
def step_impl(context):
    response_data = context.response.json()
    assert "access" in response_data, f"❌ Falha no login: {response_data}"
    print("✅ Login realizado com sucesso!")
