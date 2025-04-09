import json
from behave import given, when, then
from django.test import Client

@given("que o usuário acessa a página de cadastro")
def step_acessa_pagina_cadastro(context):
    context.client = Client()
    print("Acessando página de cadastro...")

@when("ele envia os dados de cadastro")
def step_envia_dados_cadastro(context):
    dados_usuario = {
        "username": "camila",
        "email": "camila@gmail.com",
        "tipo_usuario": "recrutador",
        "password": "abc123"
    }

    context.response = context.client.post(
        "/api/auth/register/",
        data=json.dumps(dados_usuario),
        content_type="application/json"
    )

@then('ele deve ver a mensagem "Usuário criado com sucesso!"')
def step_verifica_mensagem_cadastro(context):
    response_data = context.response.json()
    assert response_data.get("message") == "Usuário criado com sucesso!", f"Mensagem recebida: {response_data}"