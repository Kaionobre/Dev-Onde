

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
        self.browser.get('http://localhost:3000/vagas/nova')

        titulo_vaga = self.browser.find_element(By.XPATH, '/html/body/div[4]/div/form/div[1]/label/input')
        titulo_vaga.send_keys('Dev RPA')
    
        descricao_vaga = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[2]/label/textarea')
        descricao_vaga.send_keys('Procuramos um Dev RPA Python 3a de EXP')

        salario_vaga = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[3]/label/input')
        salario_vaga.send_keys('3000')

        formulario_vaga = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[4]/label/input')
        formulario_vaga.send_keys('https://docs.google.com/forms/d/e/1FAIpQLSeO704k6WKeQOcC6Cer-IOfeJw1Xl3jcm5skeNdvUkPVGl3og/viewform?usp=send_form')

        imput_vaga_ativa = self.browser.find_element(By.XPATH, '//*[@id="vaga_ativa"]')
        imput_vaga_ativa.click()
        
        tipo_contrato_vaga = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[6]/div[2]/label/select')
        tipo_contrato_vaga.click()

        selecionar_tipo_contrato_CLT = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[6]/div[2]/label/select/option[2]')
        selecionar_tipo_contrato_CLT.click()

        id_empresa = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/div[6]/div[1]/label/input')
        id_empresa.send_keys('1')

        button_criar_vaga = self.browser.find_element(By.XPATH, '//*[@id="container-page-form"]/div/form/button')
        button_criar_vaga.click()

        self.assertIn('/vagas', self.browser.current_url)