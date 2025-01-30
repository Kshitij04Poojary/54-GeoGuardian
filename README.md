## ML Models Used
1. Cyclone Risk Prediction (Linear Regression Model)
This model predicts the likelihood of a cyclone in a given region by analyzing weather conditions. It uses a linear regression approach to map weather features to cyclone risk probabilities.
Features Used: Temperature, pressure, humidity, wind speed, latitude, and constant elevation (3741 meters).

2. Landslide Risk Prediction (LightGBM Model)
This model predicts the risk of landslides by efficiently handling structured weather data using a LightGBM classifier. The output is categorized into High, Low, Moderate, or Very High risk levels.
Features Used: Temperature, humidity, precipitation, and elevation.

3. Cyclone Intensity Assessment (Deep Learning Model - ResNet-18)
A ResNet-18 model fine-tuned to assess cyclone intensity from satellite images generated for specific geolocations. The architecture outputs a single numerical intensity value.
Features Used: Satellite images of size 224x224 pixels, latitude, and longitude for image generation.

4. Flood Detection from Satellite Images (FastAI Image Classification Model)
This model classifies satellite images into flooded and non-flooded categories using transfer learning. It provides prediction probabilities along with the classification result.
Features Used: Satellite image data with relevant pixel information preprocessed for classification.
