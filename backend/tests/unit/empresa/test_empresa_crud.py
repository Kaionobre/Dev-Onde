import pytest
from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.fixture
def client():
    return Client()

@pytest.fixture
@pytest.mark.django_db
def token(client):
    user = User.objects.create_user(username="sormany", password="abc123")
    response = client.post(
        "/api/auth/login/",
        data={"username": "sormany", "password": "abc123"},
        content_type="application/json"
    )
    assert response.status_code == 200
    return response.json()["access"]

@pytest.fixture
def auth_headers(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}

@pytest.mark.django_db
def test_criar_empresa(client, auth_headers):
    empresa = {
        "nome": "Empresa Teste",
        "setor": "Tecnologia",
        "localizacao": "São Paulo"
    }

    response = client.post(
        "/api/empresas/",
        data=empresa,
        content_type="application/json",
        **auth_headers
    )
    assert response.status_code == 201
    assert "id" in response.json()

@pytest.mark.django_db
def test_editar_empresa(client, auth_headers):
    response = client.post(
        "/api/empresas/",
        data={
            "nome": "Empresa I5 Lab",
            "setor": "Tech",
            "localizacao": "Patos"
        },
        content_type="application/json",
        **auth_headers
    )
    empresa_id = response.json()["id"]

    patch = client.patch(
        f"/api/empresas/{empresa_id}/",
        data={"nome": "Empresa Atualizada"},
        content_type="application/json",
        **auth_headers
    )

    assert patch.status_code == 200
    assert patch.json()["nome"] == "Empresa Atualizada"

@pytest.mark.django_db
def test_deletar_empresa(client, auth_headers):
    response = client.post(
        "/api/empresas/",
        data={
            "nome": "Empresa X",
            "setor": "Tech",
            "localizacao": "Patos"
        },
        content_type="application/json",
        **auth_headers
    )
    empresa_id = response.json()["id"]

    delete = client.delete(f"/api/empresas/{empresa_id}/", **auth_headers)
    assert delete.status_code == 204
