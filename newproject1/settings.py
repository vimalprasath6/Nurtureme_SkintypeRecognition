import os
from pathlib import Path

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key for Django project (keep this secure in production)
SECRET_KEY = 'iva66$y@-ey^=8pb2uoaa5q9qx-rvbqt2!66_u=wok5nwu+1q0'

# Debug mode (set to False in production)
DEBUG = Tru

# Allowed hosts for Vercel deployment
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.vercel.app',   # Allow all Vercel subdomains
    '*',             # Keep wildcard for testing (optional, remove in prod)
]

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',  # Your custom app
]

# Middleware settings
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Root URL configuration
ROOT_URLCONF = 'newproject1.urls'

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'myapp/templates'],  # Custom templates directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database configuration
# For Vercel deployment, SQLite is fine for testing; consider PostgreSQL for production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Static files (CSS, JS, images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [
    BASE_DIR / 'myapp/static/myapp',
]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Model path for loading in views
# Use string conversion for Vercel compatibility
MODEL_PATH = str(BASE_DIR / 'model/OG_Nurturemeorg.h5')

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Optional: Whitenoise for serving static files in production
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Optional: simple index view if needed
from django.template import loader
from django.http import HttpResponse

def my_view(request):
    try:
        template = loader.get_template('index1.html')
        return HttpResponse(template.render({}, request))
    except Exception as e:
        return HttpResponse(f"Template error: {e}", status=500)
