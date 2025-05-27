from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20, unique=True)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # New Field
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)   # New Field

class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    check_in = models.DateTimeField(null=True, blank=True)  # Attendance Entry
    check_out = models.DateTimeField(null=True, blank=True) # Attendance Exit
    date = models.DateField(auto_now_add=True)
class LeaveRequest(models.Model):
    employee = models.ForeignKey('Employee', on_delete=models.CASCADE)
    start_date = models.DateField() 
    end_date = models.DateField()
    reason = models.TextField()
    attachment = models.FileField(upload_to='leave_attachments/', blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')],
        default='Pending'
    )
    admin_response = models.TextField(blank=True)
    salary_deduction = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(default=timezone.now)

class EmployeeReport(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    details = models.TextField()
    report_file = models.FileField(upload_to='employee_reports/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)