from flask import request,jsonify, Blueprint
import joblib
import requests
# import xgboost as xgb
import pandas
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