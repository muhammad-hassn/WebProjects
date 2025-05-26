from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from .utils import detect_motion

def home(request):
    if request.method == 'POST' and request.FILES['video']:
        video = request.FILES['video']
        fs = FileSystemStorage()
        filename = fs.save(video.name, video)
        video_path = fs.path(filename)
        
        # Motion detection ko call karo
        alerts = detect_motion(video_path)
        return render(request, 'detector/result.html', {'alerts': alerts})
    
    return render(request, 'detector/upload.html')