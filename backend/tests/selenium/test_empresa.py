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
        self.browser.get('http://localhost:3000//auth//login//')

    def tearDown(self):
        self.browser.quit()
    
    def test_login(self):
        username = self.browser.find_element(By.CSS_SELECTOR, 'body > div.LoginForm_loginPage__S7PQy > form > input:nth-child(2)')
        username.send_keys('kaio')

        senha = self.browser.find_element(By.CSS_SELECTOR, 'body > div.LoginForm_loginPage__S7PQy > form > input:nth-child(3)')
        senha.send_keys('123')

        button_login = self.browser.find_element(By.CLASS_NAME, 'LoginForm_submitButton__CeSet')
        button_login.click()

        time.sleep(5)

        self.browser.get('http://localhost:3000/empresas/nova')

        nome_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[1]')
        nome_empresa.send_keys('Empresa X')
    
        cnpj_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[2]')
        cnpj_empresa.send_keys('46395000000139')

        email_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[3]')
        email_empresa.send_keys('monstro@gmail.com')

        telefone_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[4]')
        telefone_empresa.send_keys('83999999999')

        site_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[5]')
        site_empresa.send_keys('https://www.monstro.com.br')

        setor_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[6]')
        setor_empresa.send_keys('Agro')

        localizacao_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/input[7]')
        localizacao_empresa.send_keys('Patos-PB')

        button_cadastrar_empresa = self.browser.find_element(By.XPATH, '/html/body/div/div[4]/form/button')
        button_cadastrar_empresa.click()        

        time.sleep(4)
        self.assertIn('/home', self.browser.current_url)