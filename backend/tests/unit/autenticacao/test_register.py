import pytest
from django.test import Client

@pytest.fixture
def client():
    return Client()

@pytest.mark.django_db  # Habilita acesso ao banco
def test_registro_de_usuario_recrutador(client):
    dados = {
        "username": "camila",
        "email": "camila@gmail.com",
        "tipo_usuario": "recrutador",
        "password": "abc123"
    }

    response = client.post(
        "/api/auth/register/",
        data=dados,
        content_type="application/json"
    )
    assert response.status_code == 201
    assert response.json().get("message") == "Usuário criado com sucesso!"
