from sentinelhub import SHConfig, SentinelHubRequest, DataCollection, MimeType, BBox, CRS
import numpy as np
import matplotlib.pyplot as plt
import os

# Set up configuration (replace with your actual client_id and client_secret)
config = SHConfig()
config.sh_client_id = 'a3506ef8-5e5c-4583-b16b-a87c34f71c31'  # Replace with your Client ID
config.sh_client_secret = '0US8Y45jtdUMEs38TEssmiCETz4iC2oN'  # Replace with your Client Secret

# Save the configuration to the default file
config.save()

# Define bounding box and time range
bbox = BBox([77.5, 28.4, 77.6, 28.5], CRS.WGS84)
time_interval = ('2025-01-01', '2025-01-28')

# Define the evalscript for RGB bands
evalscript = """
//VERSION=3
function setup() {
    return {
        input: ["B04", "B03", "B02"],
        output: { bands: 3 }
    };
}
function evaluatePixel(sample) {
    return [sample.B04, sample.B03, sample.B02];
}
"""

# Create the request
request = SentinelHubRequest(
    evalscript=evalscript,
    input_data=[
        SentinelHubRequest.input_data(
            data_collection=DataCollection.SENTINEL2_L1C,
            time_interval=time_interval
        )
    ],
    responses=[SentinelHubRequest.output_response("default", MimeType.PNG)],  # Specify response MIME type
    bbox=bbox,
    size=(512, 512)
)

# Download the image data
response = request.get_data()

# Check if response is valid
if response and len(response) > 0:
    image = np.array(response[0])

    # Create directory if not exists
    output_dir = "sentinel_data"
    os.makedirs(output_dir, exist_ok=True)

    # Save image
    output_path = os.path.join(output_dir, "sentinel_image.png")
    plt.imsave(output_path, image)
    print(f"Image saved to {output_path}")
else:
    print("No image data received.")
