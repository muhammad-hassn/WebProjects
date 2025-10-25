from django.contrib import admin
from .models import Employee, Attendance, LeaveRequest, EmployeeReport
from django.http import HttpResponse
from reportlab.pdfgen import canvas
# from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'user', 'department', 'salary')
    fields = ('user', 'employee_id', 'position', 'department', 'contact', 'salary', 'profile_picture')
    actions = ['create_user_for_employee']

    def create_user_for_employee(self, request, queryset):
        for employee in queryset:
            if not employee.user:  # صرف ان ایمپلائیز کے لیے جن کا یوزر نہیں
                user = User.objects.create_user(
                    username=employee.employee_id,  # ایمپلائی آئیڈی کو یوزرنیم بنائیں
                    password='default123'  # ڈیفالٹ پاس ورڈ
                )
                employee.user = user
                employee.save()

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'check_in', 'check_out')

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('employee', 'start_date', 'end_date', 'status')
    actions = ['generate_response_pdf']

    def generate_response_pdf(self, request, queryset):
        # PDF generate karein
        response = HttpResponse(content_type='application/pdf')
        pdf = canvas.Canvas(response)
        for leave in queryset:
            pdf.drawString(100, 800, f"Employee: {leave.employee.user.username}")
            pdf.drawString(100, 780, f"Response: {leave.admin_response}")
        pdf.showPage()
        pdf.save()
        return response
    generate_response_pdf.short_description = "Generate Response PDF"

    def approve_leave(self, request, queryset):
        for leave in queryset:
            leave.status = 'Approved'
            # Salary Deduction Logic (Example: Deduct 1 Day Salary)
            leave.salary_deduction = leave.employee.salary / 30  # Assuming Monthly Salary
            leave.save()
    
    def reject_leave(self, request, queryset):
        queryset.update(status='Rejected', admin_response='Leave Request Rejected')
