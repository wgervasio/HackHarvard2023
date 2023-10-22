from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import io
import logging
import time  # Import the time module to calculate prediction time
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})


# Set up logging to file
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s',
                    filename='app.log',  # Name of the log file
                    filemode='a')  # Append mode so log file isn't overwritten at each run


CLASSES = ['biodegradable', 'cardboard', 'glass', 'metal', 'paper', 'plastic']


model = torch.load('yolo_model.pth')


@app.route('/predict', methods=['POST'])
def predict():
    print ('entering predict')
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
        confidence = float(scores[0])
        if confidence < 0.6:
            return jsonify({})
        else:
            res= jsonify({
                'boxes':[float(b) for b in boxes],
                'confidence':confidence,
                'class': CLASSES[int(categories[0])]
            })
    else:
        res= jsonify({'error': 'Something went wrong'}), 400
    end_time = time.time()
    duration = end_time - start_time
    logging.info(f"Prediction successful. Duration: {duration:.2f} seconds")
    return res


@app.route('/')
def main():
    return "The server is running. Use the '/predict' endpoint to upload an image for classification."

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # This will run the server publicly on port 5000
