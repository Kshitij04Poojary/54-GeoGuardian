from flask import request,jsonify, Blueprint
import joblib
import requests
# import xgboost as xgb
import pandas
import numpy as np
import torch
import pickle
from pathlib import Path
import rasterio as rio
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from fastai.data.all import *
from fastai.vision.all import *
# import PILImage
import timm
# from flask_login import current_user, login_required
main_bp = Blueprint("main_bp", __name__)


@main_bp.route('/', methods=['GET'])
def ml_1():
    return jsonify({"message": "Hi"})



@main_bp.route('/cyclone/csv', methods=['GET'])
def cyclone_csv():
    model = joblib.load("package/main/ml-models/model_lr_cyclone.pkl")
    scaler = joblib.load("package/main/ml-models/scaler_cyclone.pkl")
    api_key = "AxCaPnOSDvhvnZCbmtjjbhGYjXhIvAis"
    url = f"https://www.ncdc.noaa.gov/cdo-web/api/v2/locations"

    headers = {'token': api_key}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Example of extracting location or data
    locations = data['results']
    print(locations)
    data = [28.404460,1001.242177,60.823380,19.548648,0.000084,9.246782,131.821235,0.683405	]
    num_cols = ['Sea_Surface_Temperature', 'Atmospheric_Pressure', 'Humidity',
       'Wind_Shear', 'Vorticity', 'Latitude', 'Ocean_Depth',
       'Proximity_to_Coastline']
    target = "Cyclone"
    scaled_data = scaler.transform([data])
    targets = model.predict(scaled_data)
    return jsonify({"data":targets.tolist()[0]})


@main_bp.route('/landslide/csv', methods=['GET'])
def landslide_csv():
    model = joblib.load("package/main/ml-models/landslide_risk_prediction.pkl")
    cols = ["Temperature", "Humidity", "Precipitation", "Elevation (m)"]
    target = "Landslide Risk Prediction"
    data = [[23,91,118,994]]
    y_pred = model.predict(data)
    return jsonify({"msg": y_pred.tolist()})


class CycloneIntensityModel(nn.Module):
    def __init__(self):
        super(CycloneIntensityModel, self).__init__()
        self.model = timm.create_model('resnet18.a1_in1k', pretrained=True)
        in_features = self.model.fc.in_features
        self.model.fc = torch.nn.Linear(in_features, 1)

    def forward(self, x):
        return self.model(x)



@main_bp.route('/cyclone/images', methods=['GET'])
def cyclone_images():
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
    return jsonify({"data": output.item()})



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
