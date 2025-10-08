# myapp/urls.py
from django.urls import path
from myapp import views
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('', views.index1, name='home'),      # Home page route (index1)
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),  # Redirect to homepage after logout
    path('navigate_to_index2/', views.navigate_to_index2, name='navigate_to_index2'),  # goes to 2nd page
    path('navigate_to_index4/', views.navigate_to_index4, name='navigate_to_index4'),  # goes to 2nd page
    path('register/', views.register, name='register'),
    path('index1/', views.index1, name='index1'),
    path('send-reset-link', views.send_reset_link, name='send_reset_link'),
    path('index2/', views.index2, name='index2'),
    path('index3/', views.index3, name='index3'),  
    path('index4/', views.index2, name='index4'),
    path('products/', views.index4, name='index4'),  # Ensure this URL pattern exists
    path('process_frame', views.process_frame, name='process_frame'),
    path('predict_skin_type/', views.predict_skin_type, name='predict_skin_type'),
]
