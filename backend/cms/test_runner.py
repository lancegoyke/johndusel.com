from django.test.runner import DiscoverRunner
from django.test.utils import override_settings


class TestRunner(DiscoverRunner):
    def run_tests(self, *args, **kwargs):
        with override_settings(**TEST_SETTINGS):
            return super().run_tests(*args, **kwargs)


TEST_SETTINGS = {"DEFAULT_FILE_STORAGE": "inmemorystorage.InMemoryStorage"}
