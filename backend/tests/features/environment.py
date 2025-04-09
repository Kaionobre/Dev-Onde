import os
import sys
import django
from django.test.runner import DiscoverRunner
from django.test import Client

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dev_onde.settings")
django.setup()


def before_all(context):
    context.test_runner = DiscoverRunner(interactive=False)
    context.test_runner.setup_test_environment()
    context.old_config = context.test_runner.setup_databases()
    context.client = Client()

def after_all(context):
    context.test_runner.teardown_databases(context.old_config)
    context.test_runner.teardown_test_environment()
