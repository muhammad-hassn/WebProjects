import cv2
import numpy as np

def detect_motion(video_path):
    cap = cv2.VideoCapture(video_path)
    prev_frame = None
    alerts = []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Frame ko grayscale aur blur karo
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # Pehla frame set karo
        if prev_frame is None:
            prev_frame = gray
            continue
        
        # Frame difference calculate karo
        frame_diff = cv2.absdiff(prev_frame, gray)
        thresh = cv2.threshold(frame_diff, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        
        # Contours dhoondo (motion areas)
        contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Agar contour ka area bada ho, toh alert karo
        for contour in contours:
            if cv2.contourArea(contour) > 1000:
                alerts.append("MOTION DETECTED: Possible Snatching! 🚨")
                break
        
        prev_frame = gray
    
    cap.release()
    return alerts