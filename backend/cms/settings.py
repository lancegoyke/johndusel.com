from pathlib import Path
import environ


BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False),
    SECRET_KEY=(
        str,
        "django-insecure-x#j-7*wtpxc^r$r-2$j3)&pf1_(3w=j75uf0-rk_@wq2545^1%",
    ),
    ALLOWED_HOSTS=(str, "127.0.0.1,localhost"),
    DOMAIN=(str, "http://127.0.0.1:8000"),
    STATIC_ROOT=(str, BASE_DIR / "staticfiles"),
    MEDIA_ROOT=(str, BASE_DIR / "media"),
)

# run server using production environment variables with this command:
# ENV_PATH=.production.env python manage.py runserver
env.read_env(env.str("ENV_PATH", BASE_DIR / ".development.env"))

SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")

ALLOWED_HOSTS: list[str] = env("ALLOWED_HOSTS").split(",")
DOMAIN = env("DOMAIN")

INSTALLED_APPS = [
    "whitenoise.runserver_nostatic",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "users.apps.UsersConfig",
    "blog.apps.BlogConfig",
    "uploads.apps.UploadsConfig",
]
INSTALLED_APPS += ["debug_toolbar"] if DEBUG else []
INTERNAL_IPS = (
    [
        "127.0.0.1",
    ]
    if DEBUG
    else []
)  # Django debug toolbar
TEST_RUNNER = "cms.test_runner.TestRunner"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

ROOT_URLCONF = "cms.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "cms.wsgi.application"

import dj_database_url

DATABASES = {
    # this automatically checks for the DATABASE_URL environment variable
    "default": dj_database_url.config(
        default="sqlite:///db.sqlite3",  # put database here if no DATABASE_URL
        conn_max_age=600,
        conn_health_checks=True,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = env("STATIC_ROOT")
MEDIA_URL = "/media/"
MEDIA_ROOT = env("MEDIA_ROOT")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "users.CustomUser"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly"
    ]
}

ENVIRONMENT = env("ENVIRONMENT")
if ENVIRONMENT == "production":
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True

    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    AWS_S3_ACCESS_KEY_ID = env("AWS_S3_ACCESS_KEY_ID")
    AWS_S3_SECRET_ACCESS_KEY = env("AWS_S3_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = "johndusel.com"
    AWS_DEFAULT_ACL = ""
    AWS_QUERYSTRING_AUTH = False

    if AWS_S3_ACCESS_KEY_ID and AWS_S3_SECRET_ACCESS_KEY and AWS_STORAGE_BUCKET_NAME:
        AWS_LOCATION = (
            "development" if DOMAIN == "http://127.0.0.1:8000" else "production"
        )

    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn=env("SENTRY_DSN"),
        integrations=[
            DjangoIntegration(),
        ],
    )
