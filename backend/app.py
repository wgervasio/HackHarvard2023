from flask import Flask, request, jsonify
import onnxruntime as ort
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import io

app = Flask(__name__)

ONNX_PATH = 'garbage_classification_model.onnx'
CLASSES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

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
    predicted_class = np.argmax(predictions, axis=1)

    return CLASSES[predicted_class[0]]

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        # Read the file from the request and prepare it for prediction
        image = Image.open(io.BytesIO(file.read())).convert('RGB')  # Convert image to RGB (3 channels)
        prediction = predict_onnx(image)

        return jsonify({'class': prediction})

    return jsonify({'error': 'Something went wrong'}), 400

@app.route('/')
def main():
    return "The server is running. Use the '/predict' endpoint to upload an image for classification."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # This will run the server publicly on port 5000
