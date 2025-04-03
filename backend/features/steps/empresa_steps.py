import requests
from behave import given, when, then

BASE_URL = "http://127.0.0.1:8000/api/empresas/"  # Ajuste conforme necessário
LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/"  # Endpoint de login

@given("que o usuário está autenticado")
def step_impl(context):
    credentials = {"username": "sormany", "password": "abc123"}
    response = requests.post(LOGIN_URL, json=credentials)
    
    assert response.status_code == 200, f"Falha na autenticação: {response.text}"
    
    context.token = response.json().get("access")
    context.headers = {"Authorization": f"Bearer {context.token}"}

@given("que o usuário tem os dados de uma nova empresa")
def step_impl(context):
    context.empresa_data = {
        "nome": "Empresa Teste",
        "setor": "Tecnologia",
        "localizacao": "São Paulo"
    }

@when("ele faz uma requisição POST para criar a empresa")
def step_impl(context):
    response = requests.post(BASE_URL, json=context.empresa_data, headers=context.headers)
    context.response = response
    if response.status_code == 201:
        context.empresa_id = response.json().get("id")  # Guarda o ID para os próximos testes

@then("a empresa deve ser criada com sucesso")
def step_impl(context):
    assert context.response.status_code == 201, f"Erro: {context.response.text}"

@given("que existe uma empresa cadastrada")
def step_impl(context):
    response = requests.post(BASE_URL, json={
        "nome": "Empresa Teste Edit",
        "setor": "Financeiro",
        "localizacao": "Rio de Janeiro"
    }, headers=context.headers)

    assert response.status_code == 201, f"Erro ao criar empresa para o teste: {response.text}"
    context.empresa_id = response.json().get("id")

@when("ele faz uma requisição PATCH para atualizar a empresa")
def step_impl(context):
    url = f"{BASE_URL}{context.empresa_id}/"
    response = requests.patch(url, json={"nome": "Empresa Atualizada"}, headers=context.headers)
    context.response = response

@then("a empresa deve ser atualizada com sucesso")
def step_impl(context):
    assert context.response.status_code == 200, f"Erro: {context.response.text}"
    assert context.response.json()["nome"] == "Empresa Atualizada"

@when("ele faz uma requisição DELETE para excluir a empresa")
def step_impl(context):
    url = f"{BASE_URL}{context.empresa_id}/"
    response = requests.delete(url, headers=context.headers)
    context.response = response

@then("a empresa deve ser removida com sucesso")
def step_impl(context):
    assert context.response.status_code == 204, f"Erro: {context.response.text}"
