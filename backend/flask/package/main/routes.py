from flask import request,jsonify, Blueprint
import joblib
import requests
# import xgboost as xgb
import base64
from io import BytesIO
from sentinel import create_image
import pandas
import numpy as np
import torch
import pickle
from pathlib import Path
import rasterio as rio
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from fastai.vision.all import load_learner


from fastai.data.all import *
from fastai.vision.all import *
# import PILImage
import timm
# from flask_login import current_user, login_required
main_bp = Blueprint("main_bp", __name__)


@main_bp.route('/', methods=['GET'])
def ml_1():
    return jsonify({"message": "Hi"})



@main_bp.route('/cyclone/csv', methods=['POST'])
def cyclone_csv():
    data = request.get_json()
    print(data)

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])
    print(latitude, longitude)
    model = joblib.load("package/main/ml-models/model_lr_cyclone (1).pkl")
    scaler = joblib.load("package/main/ml-models/scaler_cyclone (1).pkl")
    api_key = "bbfeb7e0020640909f854402252901"
    url = f"http://api.weatherapi.com/v1/current.json"
    params = {
    "key": api_key,  # API key
    "q": f"{latitude},{longitude}",  # Latitude and Longitude format
    "aqi": "no"      # Optional: Set to 'yes' to include air quality data
    }

    response = requests.get(url, params=params)
    print("Response code",response.status_code)
    if response.status_code == 200:
        data = response.json()

        # Extract relevant data from the response
        temperature = data['current']['temp_c']  # Temperature in Celsius
        humidity = data['current']['humidity']  # Humidity percentage
        pressure = data['current']['pressure_mb']  # Atmospheric pressure in millibars
        wind_speed = data['current']['wind_kph'] * 2
        print(temperature, humidity, pressure, wind_speed)
    # headers = {'token': api_key}
    # response = requests.get(url, headers=headers)
    # data = response.json()

    # Example of extracting location or data
    # locations = data['results']
    # print(locations)
        data = [temperature,pressure,humidity,wind_speed,latitude, 3741]
    num_cols = ['Sea_Surface_Temperature', 'Atmospheric_Pressure', 'Humidity',
       'Wind_Shear', 'Latitude', 'Ocean_Depth',
       ]
    target = "Cyclone"
    scaled_data = scaler.transform([data])
    targets = model.predict(scaled_data)
    print(targets.tolist()[0])
    # rounded_targets = [round(value, 2) for value in targets.tolist()[0]]
    # print(rounded_targets)
    return jsonify({"data": targets.tolist()[0]})


@main_bp.route('/landslide/csv', methods=['POST'])
def landslide_csv():
    model = joblib.load("package/main/ml-models/landslide_risk_prediction.pkl")
    cols = ["Temperature", "Humidity", "Precipitation", "Elevation (m)"]
    target = "Landslide Risk Prediction"
    data = request.get_json()
    print(data)

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])
    print(latitude, longitude)
    api_key = "bbfeb7e0020640909f854402252901"
    url = f"http://api.weatherapi.com/v1/current.json"
    params = {
    "key": api_key,  # API key
    "q": f"{latitude},{longitude}",  # Latitude and Longitude format
    "aqi": "no"      # Optional: Set to 'yes' to include air quality data
    }

    response = requests.get(url, params=params)
    print("Response code",response.status_code)
    if response.status_code == 200:
        data = response.json()

        # Extract relevant data from the response
        temperature = data['current']['temp_c']  # Temperature in Celsius
        humidity = data['current']['humidity']  # Humidity percentage
        precip_mm = data['current']['precip_mm']  # Atmospheric pressure in millibars
        # wind_speed = data['current']['wind_kph'] * 2
        print(temperature, humidity, precip_mm)


    dic = {
        0:"High", 1: "Low", 2:"Moderate", 3:"Very High"
    }
    data = [[temperature,humidity,precip_mm,994]]
    y_pred = model.predict(data)
    print(dic[y_pred[0]])
    return jsonify({"data": dic[y_pred[0]]})


class CycloneIntensityModel(nn.Module):
    def __init__(self):
        super(CycloneIntensityModel, self).__init__()
        self.model = timm.create_model('resnet18.a1_in1k', pretrained=True)
        in_features = self.model.fc.in_features
        self.model.fc = torch.nn.Linear(in_features, 1)

    def forward(self, x):
        return self.model(x)





@main_bp.route('/cyclone/images', methods=['POST'])
def cyclone_images():
    data = request.get_json()
    # print(data)
    latitude = float(data.get('latitude'))
    longitude = float(data.get('longitude'))
    
    model_v1_path = "package/main/ml-models/cyclone_resnet18_simple.pth"

    # Initialize the model architecture
    model = CycloneIntensityModel()

    # Load the state dictionary into the model
    model.load_state_dict(torch.load(model_v1_path, map_location=torch.device('cpu')))
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    create_image(lat=latitude, lon=longitude)
    img_path = "sentinel_data/sentinel_image.png"
    image = Image.open(img_path).convert('RGB')
    image_tensor = transform(image).unsqueeze(0)

    # Move the image tensor to the same device as the model (CPU in this case)
    device = torch.device('cpu')
    image_tensor = image_tensor.to(device)
    model.to(device)

    # Make the prediction
    with torch.no_grad():
        output = model(image_tensor)

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    print(output.item())
    return jsonify({"data": round(output.item(), 2), "image": img_base64})




from pathlib import WindowsPath, PosixPath
if hasattr(PosixPath, "_flavour") and hasattr(WindowsPath, "_flavour"):
    PosixPath._flavour = WindowsPath._flavour

learner = load_learner('package/main/ml-models/trained_model.pkl')


from PIL import Image as PILImage
from fastai.vision.all import PILImage

@main_bp.route('/flood/images', methods=['GET'])
def flood_images():
    # Get the image path from query parameters
    image_path = "sentinel_data/sentinel_image.png"
    
    if not image_path:
        return jsonify({'error': 'Please provide an image path as a query parameter'}), 400

    try:
        # Perform prediction
        label, _, probabilities = learner.predict(PILImage.create(image_path))

        # Prepare response based on prediction
        if label == '0':
            result = f"The area shown in the image is not flooded with probability {probabilities[0]*100:.2f}%."
            x = "Not Flooded"
        elif label == '1':
            result = f"The area shown in the image is flooded with probability {probabilities[1]*100:.2f}%."
            x = "Flooded"
        else:
            result = "Unknown label assigned to image."
        
        prob = probabilities[1]*100
        return jsonify({'msg': result, "prediction": x, "probability": prob.item()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500




# class MSImageTensor(Tensor):
#     def show(self, ctx: plt.Axes, *args, **kwargs):
#         ax = ctx
#         if ax is None:
#             _, ax = plt.subplots()
#         ax.imshow(self.permute((1, 2, 0)))

#     def __repr__(self):
#         return f'MSImageTensor: {self.data.shape}'

# Image loader with stacking logic

# Define your ResNet model structure (simplified)
# 
# Load the model
# model_path = "package/main/ml-models/model_flood.pth"

# @main_bp.route('/flood/images', methods=['GET'])
# def flood_images():
#     # Load the model
#     model_path = "package/main/ml-models/flood_resnet34.pth"

#     # Dummy DataLoader setup
#     dls = DataLoaders.empty()

#     # Initialize the learner
#     learn = vision_learner(dls, resnet34, metrics=accuracy, pretrained=False, n_in=3)
    
#     # Load model weights
#     learn.model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
#     learn.model.eval()

#     # Load and prepare the image
#     img_path = "sentinel_data/sentinel_image.png"
#     img = PILImage.create(img_path)

#     # Perform prediction
#     with torch.no_grad():
#         pred_class, pred_idx, outputs = learn.predict(img)

#     return jsonify({"predicted_class": str(pred_class)})
