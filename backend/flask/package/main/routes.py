import joblib
import requests
import base64
from io import BytesIO
from pathlib import WindowsPath
from flask import Blueprint, request, jsonify
from PIL import Image
from torchvision import transforms
import torch
import torch.nn as nn
from sentinel import create_image
import timm
from fastai.vision.all import load_learner, PILImage
import pathlib
# Blueprint for main routes
main_bp = Blueprint('main_bp', __name__)

# # Ensure compatibility for file paths
# if hasattr(PosixPath, "_flavour") and hasattr(WindowsPath, "_flavour"):
#     PosixPath._flavour = WindowsPath._flavour
pathlib.PosixPath = pathlib.WindowsPath

@main_bp.route('/cyclone/csv', methods=['GET', 'POST'])
def cyclone_csv():
    model = joblib.load("package/main/ml-models/model_lr_cyclone (1).pkl")
    scaler = joblib.load("package/main/ml-models/scaler_cyclone (1).pkl")

    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])

    api_key = "bbfeb7e0020640909f854402252901"
    weather_url = "http://api.weatherapi.com/v1/current.json"

    params = {
        "key": api_key,
        "q": f"{latitude},{longitude}",
        "aqi": "no"
    }

    response = requests.get(weather_url, params=params)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch weather data"}), response.status_code

    weather_data = response.json()

    # Extract relevant weather data
    temperature = weather_data['current']['temp_c']
    humidity = weather_data['current']['humidity']
    pressure = weather_data['current']['pressure_mb']
    wind_speed = weather_data['current']['wind_kph'] * 2

    input_data = [temperature, pressure, humidity, wind_speed, latitude, 3741]
    scaled_data = scaler.transform([input_data])
    prediction = model.predict(scaled_data)

    return jsonify({"data": prediction.tolist()[0]})


@main_bp.route('/landslide/csv', methods=['GET', 'POST'])
def landslide_csv():
    model = joblib.load("package/main/ml-models/landslide_risk_prediction (2).pkl")
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])

    api_key = "bbfeb7e0020640909f854402252901"
    weather_url = "http://api.weatherapi.com/v1/current.json"

    params = {
        "key": api_key,
        "q": f"{latitude},{longitude}",
        "aqi": "no"
    }

    response = requests.get(weather_url, params=params)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch weather data"}), response.status_code

    weather_data = response.json()

    # Extract relevant weather data
    temperature = weather_data['current']['temp_c']
    humidity = weather_data['current']['humidity']
    precip_mm = weather_data['current']['precip_mm']

    input_data = [[temperature, humidity, precip_mm, 994]]
    prediction = model.predict(input_data)

    risk_levels = {0: "High", 1: "Low", 2: "Moderate", 3: "Very High"}
    return jsonify({"data": risk_levels.get(prediction[0], "Unknown")})


class CycloneIntensityModel(nn.Module):
    def __init__(self):
        super(CycloneIntensityModel, self).__init__()
        self.model = timm.create_model('resnet18.a1_in1k', pretrained=True)
        in_features = self.model.fc.in_features
        self.model.fc = torch.nn.Linear(in_features, 1)

    def forward(self, x):
        return self.model(x)

@main_bp.route('/cyclone/images', methods=['GET', 'POST'])
def cyclone_images():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    latitude = float(data.get('latitude'))
    longitude = float(data.get('longitude'))

    create_image(lat=latitude, lon=longitude)
    model_path = "package/main/ml-models/cyclone_resnet18_simple.pth"
    model = CycloneIntensityModel()
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    # Assuming `create_image` is defined elsewhere to generate an image
    
    img_path = "sentinel_data/sentinel_image.png"
    image = Image.open(img_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0)

    # Make the prediction
    with torch.no_grad():
        output = model(image_tensor)

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({"data": round(output.item(), 2), "image": img_base64})


learner = load_learner('package/main/ml-models/trained_model.pkl')

@main_bp.route('/flood/images', methods=['GET'])
def flood_images():
    image_path = "sentinel_data/sentinel_image.png"

    if not image_path:
        return jsonify({"error": "Please provide an image path"}), 400

    try:
        label, _, probabilities = learner.predict(PILImage.create(image_path))

        if label == '0':
            result = f"The area shown in the image is not flooded with probability {probabilities[0] * 100:.2f}%."
            prediction = "Not Flooded"
        elif label == '1':
            result = f"The area shown in the image is flooded with probability {probabilities[1] * 100:.2f}%."
            prediction = "Flooded"
        else:
            result = "Unknown label assigned to image."

        probability = probabilities[1] * 100
        return jsonify({"msg": result, "prediction": prediction, "probability": probability.item()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
