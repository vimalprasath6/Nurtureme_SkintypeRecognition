from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('process_frame', views.process_frame, name='process_frame'),
    path('predict_skin_type/', views.predict_skin_type, name='predict_skin_type'),
]
