from django.apps import AppConfig


class DemoTaskConfig(AppConfig):
    name = 'demo_task'

    def ready(self):
        import demo_task.signals
