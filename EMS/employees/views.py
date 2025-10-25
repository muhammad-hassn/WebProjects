# employees/views.py
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Employee, Attendance, LeaveRequest, EmployeeReport
from django.contrib import messages
from django.utils import timezone
from django.core.files.storage import FileSystemStorage
from django.http import FileResponse


def home(request):
    return redirect('view_employees')  
from django.contrib.auth.models import User

@login_required
def add_employee(request):
    if request.method == 'POST':
        # یوزر بنائیں
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.create_user(username=username, password=password)
        
        # ایمپلائی بنائیں
        Employee.objects.create(
            user=user,
            employee_id=request.POST.get('employee_id'),
            position=request.POST.get('position'),
            department=request.POST.get('department'),
            contact=request.POST.get('contact')
        )
        return redirect('view_employees')
    return render(request, 'employees/add_employee.html')

@login_required
def update_employee(request, emp_id):
    employee = Employee.objects.get(id=emp_id)
    if request.method == 'POST':
        employee.position = request.POST.get('position')
        employee.department = request.POST.get('department')
        employee.contact = request.POST.get('contact')
        employee.save()
        return redirect('view_employees')
    return render(request, 'employees/update_employee.html', {'employee': employee})

@login_required
def delete_employee(request, emp_id):
    employee = Employee.objects.get(id=emp_id)
    employee.delete()
    return redirect('view_employees')

@login_required
def view_employees(request):
    employees = Employee.objects.all()
    return render(request, 'employees/view_employees.html', {'employees': employees})

@login_required
def mark_attendance(request):
    if request.method == 'POST':
        employee_id = request.POST.get('employee_id')
        status = request.POST.get('status') == 'on'
        employee = Employee.objects.get(employee_id=employee_id)
        Attendance.objects.create(employee=employee, status=status)
        return redirect('view_attendance')
    return render(request, 'employees/mark_attendance.html')

@login_required
def view_attendance(request):
    attendances = Attendance.objects.all()
    return render(request, 'employees/view_attendance.html', {'attendances': attendances})





@login_required
def employee_profile(request):
    employee = request.user.employee
    leave_requests = LeaveRequest.objects.filter(employee=employee)
    attendances = Attendance.objects.filter(employee=employee)

    # POST Request Handling
    if request.method == 'POST':
        # Leave Request Submission
        if 'leave_request' in request.POST:
            start_date = request.POST.get('start_date')
            end_date = request.POST.get('end_date')
            reason = request.POST.get('reason')
            attachment = request.FILES.get('attachment')
            
            LeaveRequest.objects.create(
                employee=employee,
                start_date=start_date,
                end_date=end_date,
                reason=reason,
                attachment=attachment
            )
            messages.success(request, 'Leave application submitted!')

        # Attendance Check-In
        elif 'check_in' in request.POST:
            Attendance.objects.create(employee=employee, check_in=timezone.now())
            messages.success(request, 'Checked in successfully!')

        # Attendance Check-Out
        elif 'check_out' in request.POST:
            attendance = Attendance.objects.filter(
                employee=employee, 
                check_out__isnull=True
            ).last()
            if attendance:
                attendance.check_out = timezone.now()
                attendance.save()
                messages.success(request, 'Checked out successfully!')

        # Profile Picture Upload
        elif 'profile_pic' in request.FILES:
            profile_pic = request.FILES['profile_pic']
            fs = FileSystemStorage()
            filename = fs.save(f'profile_pics/{profile_pic.name}', profile_pic)
            employee.profile_picture = filename
            employee.save()
            messages.success(request, 'Profile picture updated!')

        return redirect('employee_profile')

    # Chart Data Preparation
    dates = [a.date.strftime("%Y-%m-%d") for a in attendances]
    statuses = ["Present" if a.check_in else "Absent" for a in attendances]

    return render(request, 'employees/profile.html', {
        'employee': employee,
        'leave_requests': leave_requests,
        'attendances': attendances,
        'dates': dates,
        'statuses': statuses
    })

@login_required
def admin_leave_response(request, leave_id):
    if not request.user.is_superuser:
        return redirect('home')
    
    leave = LeaveRequest.objects.get(id=leave_id)
    
    if request.method == 'POST':
        response = request.POST.get('admin_response')
        leave.admin_response = response
        leave.save()
        messages.success(request, 'Response Submitted!')
    
    # Generate PDF Report
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Leave_Response_{leave_id}.pdf"'
    
    p = canvas.Canvas(response)
    p.drawString(100, 800, f"Leave ID: {leave_id}")
    p.drawString(100, 780, f"Employee: {leave.employee.user.username}")
    p.drawString(100, 760, f"Status: {leave.status}")
    p.drawString(100, 740, f"Admin Response: {leave.admin_response}")
    p.showPage()
    p.save()
    
    return response



@login_required
def download_response(request, leave_id):
    leave = LeaveRequest.objects.get(id=leave_id)
    return FileResponse(open(leave.response_document.path, 'rb'))