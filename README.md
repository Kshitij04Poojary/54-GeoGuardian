# GeoGuardian

## Overview

This project is a web-based application that provides insights and predictions related to natural disasters like cyclones, landslides, and floods. It uses various machine learning models for risk predictions and image classification.

## Running the Frontend

To run the frontend of this application locally, follow these steps:

1. **Clone the repository**:
   If you haven't cloned the repository yet, use the following command:

   ```bash
   git clone https://github.com/Kshitij04Poojary/54-GeoGuardian.git

2. Navigate to the frontend directory
If your frontend is located in a separate directory (e.g., frontend), navigate to that directory by running:
   ```bash
   cd frontend
   ```
3. Install dependencies
Make sure you have Node.js installed. You can check by running:
   ```bash
   node -v
   ```
4. Start the development server
   ```
   npm run dev
   ```
   This will start the development server, typically at http://localhost:3000, where you can see the frontend running.

5. Open the application
   Open a web browser and navigate to http://localhost:3000 (or another URL if your configuration specifies a different port) to view the application.

## Running the Flask Backend
1. Set up your Python environment
   It's recommended to create a virtual environment for your Python dependencies. You can do this by running:
   ```
      python -m venv venv
   ```
   On Windows:
   ```
      venv\Scripts\activate
   ```
   On macOS/Linux::
   ```
      source venv/bin/activate
   ```
2. Navigate to the frontend directory
   If your frontend is located in a separate directory (e.g., frontend), navigate to that directory by running:
      ```
      cd backend/flask
      ```
3. Install required Python packages
   Once the virtual environment is activated, install the necessary dependencies:
   ```
      pip install -r requirements.txt
   ```

4.  Run the backend server
   Start the backend server by running:
   ```
      python run.py
   ```
This will start the backend server, usually at http://localhost:5000.


## ML Models Used

1. **Cyclone Risk Prediction (Linear Regression Model)**  
   This model predicts the likelihood of a cyclone in a given region by analyzing weather conditions. It uses a linear regression approach to map weather features to cyclone risk probabilities.  
   **Features Used**: Temperature, pressure, humidity, wind speed, latitude, and elevation.  
   **Dataset**:  [Cyclone Dataset](https://www.kaggle.com/datasets/rajumavinmar/cyclone-dataset)

2. **Landslide Risk Prediction (LightGBM Model)**  
   This model predicts the risk of landslides by efficiently handling structured weather data using a LightGBM classifier. The output is categorized into High, Low, Moderate, or Very High risk levels.  
   **Features Used**: Temperature, humidity, precipitation, and elevation.  
   **Dataset**:  [Landslide Prediction Dataset](https://www.kaggle.com/datasets/sreeragunandha/landslide-prediction-dataset)

3. **Cyclone Intensity Assessment (Deep Learning Model - ResNet-18)**  
   A ResNet-18 model fine-tuned to assess cyclone intensity from satellite images generated for specific geolocations. The architecture outputs a single numerical intensity value.  
   **Features Used**: Satellite images of size 224x224 pixels, latitude, and longitude for image generation.  
   **Dataset**:  [Cyclone Image Dataset](https://www.kaggle.com/datasets/sshubam/insat3d-infrared-raw-cyclone-images-20132021)

4. **Flood Detection from Satellite Images (FastAI Image Classification Model)**  
   This model classifies satellite images into flooded and non-flooded categories using transfer learning. It provides prediction probabilities along with the classification result.  
   **Features Used**: Satellite image data with relevant pixel information preprocessed for classification.  
   **Dataset**:   [Flood Dataset](https://www.kaggle.com/datasets/rahultp97/louisiana-flood-2016)

## Prerequisites

To run this project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Python](https://www.python.org/) (version 3.x)
- [pip](https://pip.pypa.io/en/stable/) (for Python package installation)

