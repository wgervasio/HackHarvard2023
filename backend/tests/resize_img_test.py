import requests
import os
import json
import pytest
from PIL import Image
import io

# Function to perform a prediction given an image
def make_prediction(image_path):
    URL = 'http://localhost:5000/predict'

    # Resize the image
    with Image.open(image_path) as img:
        img = img.resize((64, 64))  # or whatever size you prefer
        # Convert the image to a byte stream (to avoid saving to disk)
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')  # format depending on the image format
        img_byte_arr = img_byte_arr.getvalue()

    files = {'file': ('image.jpg', img_byte_arr, 'image/jpeg')}  # multipart/form-data
    response = requests.post(URL, files=files)
    return response

def test_predict():
    # Navigate two directories up from the current file's directory, then into the 'data' directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(current_dir, '..', '..'))
    image_dir = os.path.join(root_dir, 'data', 'garbage_classification')

    # Specific image filename
    image_filename = 'glass/glass1.jpg'

    # Complete path to the image
    image_path = os.path.join(image_dir, image_filename)

    # Send the request and receive the response
    response = make_prediction(image_path)

    # Assert the status code
    assert response.status_code == 200

    # Load the response data
    response_data = json.loads(response.text)

    # Assert the prediction result
    assert 'class' in response_data
    assert response_data['class'] == 'glass'  # assert that the class is what you expect

# This condition is not strictly necessary for pytest, but it helps you avoid some
# errors if you want to run the script as a standalone script as well.
if __name__ == "__main__":
    pytest.main()
