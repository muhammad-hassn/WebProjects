import cv2
import numpy as np

def detect_motion(video_path):
    cap = cv2.VideoCapture(video_path)
    background_subtractor = cv2.createBackgroundSubtractorMOG2(history=500, detectShadows=False)
    consecutive_motion_frames = 0
    alerts = []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Background Subtraction
        fg_mask = background_subtractor.apply(frame)
        
        # Noise Removal (Morphological Operations)
        kernel = np.ones((5,5), np.uint8)
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel)
        fg_mask = cv2.dilate(fg_mask, kernel, iterations=2)
        
        # Contour Detection
        contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        motion_detected = False
        
        for contour in contours:
            # Contour Area Check (Strict)
            if cv2.contourArea(contour) < 10000:  # Only large movements
                continue
                
            # Aspect Ratio Check (Snatching-like motion is usually elongated)
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / float(h)
            if aspect_ratio < 0.3 or aspect_ratio > 3:  # Filter square-like contours
                motion_detected = True
                break
        
        # Validate Motion Duration
        if motion_detected:
            consecutive_motion_frames += 1
            if consecutive_motion_frames >= 10:  # Motion must last 10+ frames
                alerts.append("MOTION DETECTED: Possible Snatching! 🚨")
                consecutive_motion_frames = 0  # Reset to avoid duplicates
        else:
            consecutive_motion_frames = 0  # Reset counter
        
    cap.release()
    return alerts