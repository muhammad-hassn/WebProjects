# employees/urls.py
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import download_response

urlpatterns = [
    path('', views.home, name='home'),
    path('profile/', views.employee_profile, name='employee_profile'),
    path('download-response/<int:leave_id>/', download_response, name='download_response'),
    path('leave-response/<int:leave_id>/', views.admin_leave_response, name='admin_leave_response'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    
    path('add/', views.add_employee, name='add_employee'),
    path('update/<int:emp_id>/', views.update_employee, name='update_employee'),
    path('delete/<int:emp_id>/', views.delete_employee, name='delete_employee'),
    path('view/', views.view_employees, name='view_employees'),
    path('mark_attendance/', views.mark_attendance, name='mark_attendance'),
    path('view_attendance/', views.view_attendance, name='view_attendance'),
]