from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from .utils import detect_motion

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

def home(request):
    if request.method == 'POST' and request.FILES['video']:
        video = request.FILES['video']
        fs = FileSystemStorage()
        filename = fs.save(video.name, video)
        video_path = fs.path(filename)
        if not video.name.split('.')[-1] in ALLOWED_EXTENSIONS:
            return render(request, 'detector/upload.html', {'error': 'Invalid file format!'})
        
        # Motion detection ko call karo
        alerts = detect_motion(video_path)
        return render(request, 'detector/result.html', {'alerts': alerts})
    
    return render(request, 'detector/upload.html')