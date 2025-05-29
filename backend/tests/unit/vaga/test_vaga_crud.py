import pytest
import json
from django.test import Client
from django.contrib.auth import get_user_model
from apps.recrutador.models import Recrutador

User = get_user_model()

@pytest.fixture
def client():
    return Client()

@pytest.fixture
@pytest.mark.django_db
def token_recrutador(client):
    # Cria o usuário do tipo recrutador
    user = User.objects.create_user(
        username="kaio",
        password="abc123",
        tipo_usuario="recrutador"
    )

    # Cria o objeto Recrutador vinculado ao user
    recrutador = Recrutador.objects.create(
        user=user,
        nome="Kaio Recrutador",
        email="kaio@empresa.com"
    )

    # Faz login e retorna o token de acesso
    response = client.post(
        "/api/auth/login/",
        data=json.dumps({"username": "kaio", "password": "abc123"}),
        content_type="application/json"
    )
    assert response.status_code == 200
    return response.json()["access"]

@pytest.fixture
def auth_headers_recrutador(token_recrutador):
    return {"HTTP_AUTHORIZATION": f"Bearer {token_recrutador}"}

@pytest.fixture
@pytest.mark.django_db
def empresa(client, auth_headers_recrutador):
    # Criar uma empresa para vincular às vagas
    dados_empresa = {
        "nome": "Empresa Teste",
        "setor": "Tecnologia", 
        "localizacao": "São Paulo"
    }
    
    response = client.post(
        "/api/empresas/",
        data=json.dumps(dados_empresa),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 201
    return response.json()["id"]

@pytest.mark.django_db
def test_criar_vaga_com_recrutador_autenticado(client, auth_headers_recrutador, empresa):
    dados = {
        "titulo": "Desenvolvedor Python",
        "descricao": "Vaga para desenvolvedor backend com experiência em Django.",
        "salario": 8000.00,
        "tipo_contrato": "CLT",
        "empresa": empresa,
        "requisitos": "Python, Django, REST API",
        "local_trabalho": "Remoto",
        "url_form": "https://form.example.com/candidatar"
    }

    response = client.post(
        "/api/vagas/",
        data=json.dumps(dados),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["titulo"] == dados["titulo"]
    assert data["descricao"] == dados["descricao"]
    assert float(data["salario"]) == dados["salario"]
    assert data["tipo_contrato"] == dados["tipo_contrato"]
    assert "recrutador" in data
    assert "created_at" in data

@pytest.mark.django_db
def test_listar_vagas(client, auth_headers_recrutador, empresa):
    dados_vaga = {
        "titulo": "Desenvolvedor Django",
        "descricao": "Vaga para desenvolvedor Django com experiência em REST.",
        "salario": 9000.00,
        "tipo_contrato": "CLT",
        "empresa": empresa,
        "requisitos": "Django, DRF, PostgreSQL",
        "local_trabalho": "Remoto",
        "url_form": "https://form.example.com/candidatar"
    }
    
    response = client.post(
        "/api/vagas/",
        data=json.dumps(dados_vaga),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 201
    
    response = client.get("/api/vagas/", **auth_headers_recrutador)
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

@pytest.mark.django_db
def test_editar_vaga(client, auth_headers_recrutador, empresa):
    dados_vaga = {
        "titulo": "Dev Backend",
        "descricao": "Vaga para desenvolvedor backend.",
        "salario": 7000.00,
        "tipo_contrato": "CLT",
        "empresa": empresa,
        "requisitos": "Python, FastAPI",
        "local_trabalho": "Híbrido",
        "url_form": "https://form.example.com/candidatar"
    }
    
    response = client.post(
        "/api/vagas/",
        data=json.dumps(dados_vaga),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 201
    vaga_id = response.json()["id"]
    
    dados_atualizados = {
        "titulo": "Dev Backend Senior",
        "salario": 10000.00
    }
    
    response = client.patch(
        f"/api/vagas/{vaga_id}/",
        data=json.dumps(dados_atualizados),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["titulo"] == dados_atualizados["titulo"]
    assert float(data["salario"]) == dados_atualizados["salario"]
    assert data["descricao"] == dados_vaga["descricao"]

@pytest.mark.django_db
def test_deletar_vaga(client, auth_headers_recrutador, empresa):
    dados_vaga = {
        "titulo": "Vaga para deletar",
        "descricao": "Esta vaga será deletada",
        "salario": 5000.00,
        "tipo_contrato": "PJ",
        "empresa": empresa,
        "requisitos": "JavaScript, React",
        "local_trabalho": "Presencial",
        "url_form": "https://form.example.com/candidatar"
    }
    
    response = client.post(
        "/api/vagas/",
        data=json.dumps(dados_vaga),
        content_type="application/json",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 201
    vaga_id = response.json()["id"]
    
    response = client.delete(
        f"/api/vagas/{vaga_id}/",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 204
    
    response = client.get(
        f"/api/vagas/{vaga_id}/",
        **auth_headers_recrutador
    )
    
    assert response.status_code == 404
