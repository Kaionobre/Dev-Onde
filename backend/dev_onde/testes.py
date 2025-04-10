from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model


User = get_user_model() 

class LoginTestCase(TestCase):
    def setUp(self):
        """ Cria um usuário para testar login """
        self.client = APIClient()
        self.username = "testeuser"
        self.password = "testesenha123"
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_login_com_sucesso(self):
        """ Testa login com credenciais corretas """
        url = reverse('token_obtain_pair')  # Nome correto da URL de login
        response = self.client.post(url, {"username": self.username, "password": self.password}, format="json")
        
        self.assertEqual(response.status_code, 200)  
        self.assertIn("access", response.data) 

    def test_login_com_senha_incorreta(self):
        """ Testa login com senha errada """
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {"username": self.username, "password": "senhaerrada"}, format="json")
        
        self.assertEqual(response.status_code, 401)  

    def test_login_com_usuario_inexistente(self):
        """ Testa login com usuário que não existe """
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {"username": "naoexiste", "password": "qualquercoisa"}, format="json")
        
        self.assertEqual(response.status_code, 401)  


