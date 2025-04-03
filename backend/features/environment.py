import os
import sys
import django
from django.test.runner import DiscoverRunner


# Adiciona o diretório do projeto ao PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# Configura corretamente o settings.py
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dev_onde.settings")

django.setup()



# Garantindo que o banco de testes seja criado antes de rodar os testes
class TestRunner(DiscoverRunner):
    def setup_test_environment(self, **kwargs):
        super().setup_test_environment(**kwargs)

def before_all(context):
    runner = TestRunner()
    runner.setup_test_environment()
    context.test_runner = runner
    context.client = django.test.Client()  # Criando um cliente de testes do Django
