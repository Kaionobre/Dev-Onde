from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import unittest

class TestLogDividido(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()
        self.browser.get('http://localhost:3000//auth//login//')

    def tearDown(self):
        self.browser.quit()
    
    def test_login(self):
        username = self.browser.find_element(By.CSS_SELECTOR, 'body > div.LoginForm_loginPage__S7PQy > form > input:nth-child(2)')
        username.send_keys('angelica')
        time.sleep(2)
        self.assertEqual(username.get_attribute('value'), 'angelica')

        senha = self.browser.find_element(By.CSS_SELECTOR, 'body > div.LoginForm_loginPage__S7PQy > form > input:nth-child(3)')
        senha.send_keys('angelica123')
        time.sleep(2)
        self.assertEqual(senha.get_attribute('value'), 'angelica123')


    
        #button_login = browser.find_element(By.CSS_SELECTOR, 'body > div.LoginForm_loginPage__S7PQy > form > button').click()
