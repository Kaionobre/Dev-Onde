import json
from behave import given, when, then
from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()

@given("que o usuário está autenticado")
def step_impl(context):
    context.client = Client()
    context.username = "sormany"
    context.password = "abc123"

    # Cria o usuário no banco de testes se não existir
    if not User.objects.filter(username=context.username).exists():
        User.objects.create_user(username=context.username, password=context.password)

    # Faz login
    response = context.client.post(
        "/api/auth/login/",
        data=json.dumps({"username": context.username, "password": context.password}),
        content_type="application/json"
    )

    assert response.status_code == 200, f"Erro no login: {response.content}"
    context.token = response.json()["access"]
    context.headers = {"HTTP_AUTHORIZATION": f"Bearer {context.token}"} 

@given("que o usuário tem os dados de uma nova empresa")
def step_impl(context):
    context.empresa_data = {
        "nome": "Empresa Teste",
        "setor": "Tecnologia",
        "localizacao": "São Paulo"
    }

@when("ele faz uma requisição POST para criar a empresa")
def step_impl(context):
    context.response = context.client.post(
        "/api/empresas/",
        data=json.dumps(context.empresa_data),
        content_type="application/json",
        **context.headers
    )
    if context.response.status_code == 201:
        context.empresa_id = context.response.json()["id"]

@then("a empresa deve ser criada com sucesso")
def step_impl(context):
    assert context.response.status_code == 201, f"Erro: {context.response.content}"

@given("que existe uma empresa cadastrada")
def step_impl(context):
    empresa = {
        "nome": "Empresa I5 Lab",
        "setor": "Tech",
        "localizacao": "Patos/PB"
    }
    response = context.client.post(
        "/api/empresas/",
        data=json.dumps(empresa),
        content_type="application/json",
        **context.headers
    )
    assert response.status_code == 201, f"Erro ao criar empresa: {response.content}"
    context.empresa_id = response.json()["id"]

@when("ele faz uma requisição PATCH para atualizar a empresa")
def step_impl(context):
    response = context.client.patch(
        f"/api/empresas/{context.empresa_id}/",
        data=json.dumps({"nome": "Empresa Atualizada"}),
        content_type="application/json",
        **context.headers
    )
    context.response = response

@then("a empresa deve ser atualizada com sucesso")
def step_impl(context):
    assert context.response.status_code == 200, f"Erro: {context.response.content}"
    assert context.response.json()["nome"] == "Empresa Atualizada"

@when("ele faz uma requisição DELETE para excluir a empresa")
def step_impl(context):
    response = context.client.delete(
        f"/api/empresas/{context.empresa_id}/",
        **context.headers
    )
    context.response = response

@then("a empresa deve ser removida com sucesso")
def step_impl(context):
    assert context.response.status_code == 204, f"Erro: {context.response.content}"
