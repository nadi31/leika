from django.apps import AppConfig


class CoursesConfig(AppConfig):
    name = 'courses'
from django.apps import AppConfig


class YourAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'your_app'

    def ready(self):
        import your_app.signals  # Import signals to connect them
