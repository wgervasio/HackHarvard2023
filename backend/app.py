from flask import Flask, request, jsonify
import onnxruntime as ort
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import io
import logging
import time  # Import the time module to calculate prediction time
import torch
app = Flask(__name__)

# Set up logging to file
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s',
                    filename='app.log',  # Name of the log file
                    filemode='a')  # Append mode so log file isn't overwritten at each run

ONNX_PATH = 'garbage_classification_model.onnx'
CLASSES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
CLASSES_YOLO = ['biodegradable', 'cardboard', 'glass', 'metal', 'paper', 'plastic']

def predict_onnx(image):
    ort_session = ort.InferenceSession(ONNX_PATH)

    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
    ])

    # Image is processed in-memory
    image = transform(image).unsqueeze(0).numpy()

    ort_inputs = {ort_session.get_inputs()[0].name: image}
    ort_outs = ort_session.run(None, ort_inputs)
    predictions = ort_outs[0]
    predicted_class_index = np.argmax(predictions, axis=1)  # This gives the index of the class with highest probability
    predicted_class = CLASSES[predicted_class_index[0]]  # Get the class name using the index

    # Now, get the confidence score of the predicted class
    confidence_score = predictions[0, predicted_class_index[0]]

    return predicted_class, float(confidence_score)


model = torch.load('yolo_model.pth')


@app.route('/predictyolo', methods=['POST'])
def predict_yolo():
    # perform inference
    start_time = time.time()
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # Read the file from the request and prepare it for prediction
        image = Image.open(io.BytesIO(file.read())).convert('RGB')

        results = model(image, size=640)

        # inference with test time augmentation
        results = model(image, augment=True)

        # parse results
        predictions = results.pred[0]
        boxes = predictions[:, :4].flatten().tolist() # x1, y1, x2, y2
        scores = predictions[:, 4].flatten().tolist()
        categories = predictions[:, 5].flatten().tolist()


        

        res= jsonify({'boxes':[float(b) for b in boxes],
                        'confidence':[float(s) for s in scores],
                        'class': CLASSES_YOLO[int(categories[0])]})
    
    else:
        res= jsonify({'error': 'Something went wrong'}), 400
    end_time = time.time()
    duration = end_time - start_time
    logging.info(f"Prediction successful. Duration: {duration:.2f} seconds")
    return res

@app.route('/predict', methods=['POST'])
def predict():
    # Log the start time of prediction
    start_time = time.time()

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Read the file from the request and prepare it for prediction
        image = Image.open(io.BytesIO(file.read())).convert('RGB')  # Convert image to RGB (3 channels)
        prediction, prediction_conf = predict_onnx(image)

        # Log the end time of prediction and calculate the duration
        end_time = time.time()
        duration = end_time - start_time
        logging.info(f"Prediction successful. Duration: {duration:.2f} seconds")  # Log the duration

        return jsonify({'class': prediction,
                        'confidence': prediction_conf
                        })

    # In case of failure, log the error and the time taken
    end_time = time.time()
    duration = end_time - start_time
    logging.error(f"Prediction failed. Duration: {duration:.2f} seconds")  # Log the duration

    return jsonify({'error': 'Something went wrong'}), 400

@app.route('/')
def main():
    return "The server is running. Use the '/predict' endpoint to upload an image for classification."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # This will run the server publicly on port 5000
