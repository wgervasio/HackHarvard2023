from flask import Flask
from flask_socketio import SocketIO, emit
import torch
from PIL import Image
from io import BytesIO
import base64
import time

app = Flask(__name__)
socketio = SocketIO(app)

CLASSES_YOLO = ['biodegradable', 'cardboard', 'glass', 'metal', 'paper', 'plastic']

model = torch.load('yolo_model.pth')


@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('video_frame')
def handle_video_frame(data):
    """
    Handle incoming video frame for object detection.

    Parameters:
    data (dict): Must contain a key 'image' with Base64 encoded image data.
    """

    # Decode the image from Base64
    if 'image' in data:
        start_time = time.time()  # Start time for performance logging

        try:
            # Decode the image data
            image_data = base64.b64decode(data['image'])
            image = Image.open(BytesIO(image_data)).convert('RGB')  # Convert image to RGB, as expected by the model

            # Perform inference with YOLO model
            results = model(image, size=640)  # Standard inference

            # Inference with test time augmentation (TTA)
            # Note: This step may increase inference time significantly. Ensure your system can handle this in real-time.
            results = model(image, augment=True)  # TTA inference

            # Parse results
            predictions = results.pred[0]
            boxes = predictions[:, :4].flatten().tolist()  # x1, y1, x2, y2
            scores = predictions[:, 4].flatten().tolist()
            categories = predictions[:, 5].flatten().tolist()
            confidence = float(scores[0])  # Confidence of the most confident prediction

            end_time = time.time()  # Capture end time for performance logging
            duration = end_time - start_time
            print(f"Prediction successful. Duration: {duration:.2f} seconds")  # Log duration (adjust as needed)

            # Check confidence threshold before sending results
            if confidence < 0.6:
                emit('object_data', {})  # Send empty data if low confidence
            else:
                # Prepare the response data if confidence is high enough
                response_data = {
                    'boxes': [float(b) for b in boxes],
                    'confidence': confidence,
                    'class': CLASSES_YOLO[int(categories[0])]
                }
                emit('object_data', response_data)  # Send response data

        except Exception as e:
            # In production, you'd probably want to log this error
            print(f"An error occurred: {e}")
            emit('error', {'error': 'Could not process the image data.'})
    else:
        emit('error', {'error': 'No image data received.'})
# other routes...

if __name__ == '__main__':
    socketio.run(app, debug=True,  port=5000)