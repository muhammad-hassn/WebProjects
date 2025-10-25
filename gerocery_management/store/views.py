from django.contrib.admin.views.decorators import staff_member_required
from .forms import ProductForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from .models import Product, Cart, CustomUser
from .forms import CustomerSignUpForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm

def customer_signup(request):
    if request.method == 'POST':
        form = CustomerSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = CustomerSignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

@login_required
def home(request):
    products = Product.objects.all().order_by('-created_at')
    return render(request, 'store/home.html', {'products': products})

@login_required
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'store/product_detail.html', {'product': product})

@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product=product,
        defaults={'quantity': 1}
    )
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('view_cart')

@login_required
def view_cart(request):
    cart_items = Cart.objects.filter(user=request.user)
    total = sum(item.product.price * item.quantity for item in cart_items)
    return render(request, 'store/cart.html', {
        'cart_items': cart_items,
        'total': total
    })

def product_search(request):
    query = request.GET.get('q', '')
    products = list(Product.objects.all().order_by('name'))
    
    # Binary Search Implementation
    low = 0
    high = len(products) - 1
    results = []
    
    while low <= high:
        mid = (low + high) // 2
        current_product = products[mid]
        if query.lower() in current_product.name.lower():
            results.append(current_product)
            # Check adjacent elements for same matches
            left = mid - 1
            right = mid + 1
            while left >= 0 and query.lower() in products[left].name.lower():
                results.append(products[left])
                left -= 1
            while right < len(products) and query.lower() in products[right].name.lower():
                results.append(products[right])
                right += 1
            break
        elif current_product.name.lower() < query.lower():
            low = mid + 1
        else:
            high = mid - 1
    
    return render(request, 'store/search_results.html', {'results': results})

@login_required
def checkout(request):
    cart_items = Cart.objects.filter(user=request.user)
    total = sum(item.product.price * item.quantity for item in cart_items)
    
    if request.method == 'POST':
        # यहाँ payment processing logic add करें
        return redirect('order_confirmation')
    
    return render(request, 'store/checkout.html', {
        'cart_items': cart_items,
        'total': total
    })


@login_required
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(Cart, id=item_id, user=request.user)
    
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
    else:
        cart_item.delete()
        
    return redirect('view_cart')



@staff_member_required
def admin_dashboard(request):
    products = Product.objects.all().order_by('-created_at')
    low_stock_count = Product.objects.filter(quantity__lt=5).count()
    return render(request, 'admin/dashboard.html', {
        'products': products,
        'low_stock_count': low_stock_count
    })
@staff_member_required
def product_detail_admin(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        # Update logic here
        return redirect('admin_dashboard')
    return render(request, 'admin/product_detail.html', {'product': product})

@staff_member_required
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    product.delete()
    return redirect('admin_dashboard')

@staff_member_required
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Product added successfully!")
            return redirect('admin_dashboard')
        else:
            messages.error(request, "Please correct the errors below")
    else:
        form = ProductForm()
    
    return render(request, 'admin/add_product.html', {'form': form})


def role_based_home(request):
    if request.user.is_staff:
        return redirect('admin_dashboard')
    return redirect('customer_home')


def login_view(request):
    # If user is already authenticated, redirect to home
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                messages.success(request, f"Welcome back, {username}!")
                
                # Redirect to appropriate dashboard based on user role
                if user.is_staff:
                    return redirect('admin_dashboard')
                return redirect('home')
            
        messages.error(request, "Invalid username or password.")
    
    # GET request or invalid form
    form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def logout_view(request):
    if request.user.is_authenticated:
        username = request.user.username
        logout(request)
        messages.info(request, f"{username}, you have been logged out.")
    return redirect('home')

@staff_member_required
def inventory_manager(request):
    low_stock = Product.objects.filter(quantity__lt=5)
    out_of_stock = Product.objects.filter(quantity=0)
    return render(request, 'admin/inventory.html', {
        'low_stock': low_stock,
        'out_of_stock': out_of_stock
    })


@staff_member_required
def admin_product_search(request):
    query = request.GET.get('q', '').lower()
    products = list(Product.objects.all().order_by('name'))
    
    # Binary Search Implementation
    low = 0
    high = len(products) - 1
    results = []
    
    while low <= high:
        mid = (low + high) // 2
        current_product = products[mid]
        
        if query in current_product.name.lower():
            # Collect all matches
            results.append(current_product)
            
            # Check left side
            left = mid - 1
            while left >= 0 and query in products[left].name.lower():
                results.append(products[left])
                left -= 1
            
            # Check right side
            right = mid + 1
            while right < len(products) and query in products[right].name.lower():
                results.append(products[right])
                right += 1
            break
        elif current_product.name.lower() < query:
            low = mid + 1
        else:
            high = mid - 1

    return render(request, 'admin/search_results.html', {
        'results': results,
        'query': query
    })

@login_required
def decrease_quantity(request, item_id):
    cart_item = get_object_or_404(Cart, id=item_id, user=request.user)
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        cart_item.save()
    else:
        cart_item.delete()
    return redirect('view_cart')

@login_required
def increase_quantity(request, item_id):
    cart_item = get_object_or_404(Cart, id=item_id, user=request.user)
    cart_item.quantity += 1
    cart_item.save()
    return redirect('view_cart')