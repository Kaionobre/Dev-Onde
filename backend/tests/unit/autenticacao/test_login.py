import pytest
from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()
@pytest.fixture
def client():
    return Client()

@pytest.fixture
def usuario(db):
    return User.objects.create_user(username="sormany", password="abc123")

@pytest.mark.django_db 
def test_login_com_credenciais_validas(client, usuario):
    response = client.post(
        "/api/auth/login/",
        data={"username": "sormany", "password": "abc123"},
        content_type="application/json"
    )
    assert response.status_code == 200
    assert "access" in response.json()
