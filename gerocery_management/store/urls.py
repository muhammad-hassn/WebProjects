from django.urls import path
from . import views

urlpatterns = [
    # Customer URLs
    path('', views.home, name='home'),
    path('signup/', views.customer_signup, name='signup'),
    path('product/<int:pk>/', views.product_detail, name='product_detail'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.view_cart, name='view_cart'),
    path('search/', views.product_search, name='search'),
    path('checkout/', views.checkout, name='checkout'),
    path('remove-from-cart/<int:item_id>/', views.remove_from_cart, name='remove_from_cart'),
    # Admin URLs
    path('product/<int:pk>/edit/', views.product_detail_admin, name='customer_product_edit'),
    path('admin/product/<int:pk>/edit/', views.product_detail_admin, name='admin_product_edit'),
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('product/add/', views.add_product, name='add_product'),
    path('admin/search/', views.admin_product_search, name='admin_product_search'),
    path('product/delete/<int:pk>/', views.delete_product, name='product_delete'),
    path('admin/product/add/', views.add_product, name='add_product'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/product/delete/<int:pk>/', views.delete_product, name='delete_product'),
    path('admin/inventory/', views.inventory_manager, name='inventory_manager'),
    
    # Authentication
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.login_view, name='login'),
    path('cart/decrease/<int:item_id>/', views.decrease_quantity, name='decrease_quantity'),
    path('cart/increase/<int:item_id>/', views.increase_quantity, name='increase_quantity'),
]