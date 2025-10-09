import logging
import base64
import cv2
import numpy as np
import tensorflow as tf
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseBadRequest,HttpResponse
from django.shortcuts import render, redirect
from io import BytesIO
from PIL import Image
import json
from django.views.decorators.csrf import csrf_exempt

# Configure logging
logger = logging.getLogger(__name__)

# Load the pre-trained Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Global model variable
model = None

# Function to load the TensorFlow model
def load_model():
    global model
    try:
        model = tf.keras.models.load_model(r'C:\Users\vimal\Git_Projects\newproject1\model\OG_Nurturemeorg.h5')
        logger.info("Model loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        model = None

# Load the model on startup
load_model()

# Utility function: Decode Base64 image
def decode_base64_image(image_data):
    try:
        if ',' in image_data:
            image_data = image_data.split(',')[1]  # Remove data URI prefix
        img_array = np.frombuffer(base64.b64decode(image_data), np.uint8)
        return cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    except Exception as e:
        logger.error(f"Error decoding image: {e}")
        return None

# Utility function: Preprocess image for the model
def preprocess_image(image):
    try:
        image = cv2.resize(image, (256, 256))  # Resize to model input size
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        image = image / 255.0  # Normalize image
        return image
    except Exception as e:
        logger.error(f"Error during image preprocessing: {e}")
        return None

# Utility function: Predict skin type
def predict_skin(image):
    try:
        processed_image = preprocess_image(image)
        if processed_image is None:
            return None
        prediction = model.predict(processed_image)
        skin_type_labels = {0: "Normal", 1: "Oily", 2: "Dry"}
        predicted_skin_type = skin_type_labels[np.argmax(prediction)]
        return predicted_skin_type
    except Exception as e:
        logger.error(f"Error during model prediction: {e}")
        return None

# Register View
def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        number = request.POST.get('number')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if not all([name, number, email, password, confirm_password]):
            messages.error(request, "Please fill in all fields.")
            return redirect('register')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('register')

        try:
            user = User.objects.create_user(username=name, email=email, password=password)
            user.save()
            messages.success(request, "Registration successful! Please sign in.")
            return redirect('index1')
        except Exception as e:
            logger.error(f"Error during registration: {e}")
            messages.error(request, "An error occurred. Please try again.")
            return redirect('register')

    return render(request, 'myapp/index2.html')


def send_reset_link(request):
    if request.method == "POST":
        email = request.POST.get('email')
        if email:
            # Process the email logic here (e.g., send a reset link)
            print(f"Email received: {email}")
            return redirect('home')  # Redirect to a success page or the same page
        else:
            return HttpResponse("Invalid email address", status=400)
    return HttpResponse("Only POST method is allowed", status=405)

# Views for index pages
def index1(request):
    return render(request, 'myapp/index1.html')

def index2(request):
    return render(request, 'myapp/index2.html')

def index3(request):
    return render(request, 'myapp/index3.html')

def index4(request):
    return render(request, 'myapp/index4.html')

def navigate_to_index2(request):
    return render(request, 'index2.html')

def navigate_to_index4(request):
    return render(request, 'index4.html')


# Process Frame for Face Detection & Lighting Check
def process_frame(request):
    if request.method == 'POST':
        try:
            image_data = request.POST.get('image')
            frame = decode_base64_image(image_data)

            if frame is None:
                return JsonResponse({'message': "Invalid image data."}, status=400)

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            avg_brightness = np.mean(gray)
            lighting_message = "Adequate lighting" if avg_brightness > 50 else "Sit in proper lighting"

            if len(faces) == 0:
                return JsonResponse({'message': "No face detected.", 'lighting': lighting_message})

            frame_height, frame_width = gray.shape
            for (x, y, w, h) in faces:
                face_center_x = x + w // 2
                face_center_y = y + h // 2
                frame_center_x = frame_width // 2
                frame_center_y = frame_height // 2

                if abs(face_center_x - frame_center_x) > frame_width * 0.2 or \
                   abs(face_center_y - frame_center_y) > frame_height * 0.2:
                    return JsonResponse({'message': "Center your face.", 'lighting': lighting_message})

            return JsonResponse({'message': "Face detected and centered.", 'lighting': lighting_message})
        except Exception as e:
            logger.error(f"Error processing frame: {e}")
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)



# Utility function: Predict skin type
def predict_skin(image):
    try:
        processed_image = preprocess_image(image)
        if processed_image is None:
            return None
        logger.info(f"Prediction input shape: {processed_image.shape}")  # Log shape of the processed image
        prediction = model.predict(processed_image)
        logger.info(f"Prediction result: {prediction}")  # Log the prediction output
        skin_type_labels = {0: "dry", 1: "normal", 2: "oily"}
        predicted_skin_type = skin_type_labels[np.argmax(prediction)]
        return predicted_skin_type
    except Exception as e:
        logger.error(f"Error during model prediction: {e}")
        return None

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
import logging

# Configure logging
logger = logging.getLogger(__name__)

@csrf_exempt
# Predict Skin Type View
def predict_skin_type(request):
    # Ensure the model is loaded before making a prediction
    if model is None:
        logger.error("Model is not loaded or unavailable.")
        return JsonResponse({'error': 'The model is not available at the moment. Please try again later.'}, status=500)

    if request.method == 'POST':
        try:
            # Get and decode the incoming JSON data
            body_unicode = request.body.decode('utf-8')
            data = json.loads(body_unicode)
            image_data = data.get('image')

            # Ensure image data is provided
            if not image_data:
                logger.error("No image data provided.")
                return HttpResponseBadRequest('No image data provided.')

            # Decode the base64-encoded image
            frame = decode_base64_image(image_data)
            if frame is None:
                logger.error("Failed to decode image data.")
                return JsonResponse({'error': 'Invalid image data.'}, status=400)

            # Make the skin type prediction
            skin_type = predict_skin(frame)
            if skin_type is None:
                logger.error("Skin type prediction failed.")
                return JsonResponse({'error': 'Skin type prediction failed.'}, status=500)

            # Return the predicted skin type
            return JsonResponse({'skinType': skin_type})
        
        # Handle specific errors
        except json.JSONDecodeError:
            logger.error("Invalid JSON format.")
            return HttpResponseBadRequest('Invalid JSON format.')

        except Exception as e:
            logger.error(f"Error in predict_skin_type: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    # If the request method is not POST
    logger.error("Invalid request method.")
    return HttpResponseBadRequest('Invalid request method.')

