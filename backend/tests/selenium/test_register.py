from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import unittest

class TestLogDividido(unittest.TestCase):

    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # modo invisível
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        self.browser = webdriver.Chrome(options=chrome_options)
        self.browser.get('http://localhost:3000//auth//registro//')


    def tearDown(self):
        self.browser.quit()


    def test_register(self):
        username = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/input[1]')
        username.send_keys('pedro')

        email = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/input[2]')
        email.send_keys('pedro@gmail.com')


        senha = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/input[3]')
        senha.send_keys('123')

        tipo_usuario = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/select')
        tipo_usuario.click()

        selecionar_tipo_usuario_recrutador = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/select/option[2]')
        selecionar_tipo_usuario_recrutador.click()


        button_register = self.browser.find_element(By.XPATH, '/html/body/div[4]/form/button')
        button_register.click()

        time.sleep(6)

        self.assertIn('auth/login', self.browser.current_url)
    