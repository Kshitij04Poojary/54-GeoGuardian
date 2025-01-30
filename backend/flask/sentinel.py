from sentinelhub import SHConfig, SentinelHubRequest, DataCollection, MimeType, BBox, CRS
import numpy as np
import matplotlib.pyplot as plt
import os

# Set up Sentinel Hub credentials
def create_image(lat, lon):
    config = SHConfig()
    config.sh_client_id = 'a3506ef8-5e5c-4583-b16b-a87c34f71c31'  # Replace with your Client ID
    config.sh_client_secret = '0US8Y45jtdUMEs38TEssmiCETz4iC2oN'  # Replace with your Client Secret
    config.save()

    # Given single point (longitude, latitude)
    # lon, lat = 77.55, 28.45  # Replace with your actual values

    # Define a small bounding box around the point (±0.01 degrees ~1.1km)
    delta = 0.1  
    min_lon, max_lon = lon - delta, lon + delta
    min_lat, max_lat = lat - delta, lat + delta
    bbox = BBox(bbox=[min_lon, min_lat, max_lon, max_lat], crs=CRS.WGS84)

    # Define time range
    time_interval = ('2025-01-01', '2025-01-28')

    # Evalscript for RGB bands
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

    # Create request
    request = SentinelHubRequest(
        evalscript=evalscript,
        input_data=[
            SentinelHubRequest.input_data(
                data_collection=DataCollection.SENTINEL2_L1C,
                time_interval=time_interval
            )
        ],
        responses=[SentinelHubRequest.output_response("default", MimeType.PNG)],
        bbox=bbox,
        size=(1024, 1024)
    )

    # Download image data
    response = request.get_data()
    if response and len(response) > 0:
        image = np.array(response[0])

        # Brighten the image by multiplying pixel values by a factor
        brightness_factor = 5  # Factor to brighten the image
        bright_image = np.clip(image * brightness_factor, 0, 255).astype(np.uint8)

        # Create directory if not exists
        output_dir = "sentinel_data"
        os.makedirs(output_dir, exist_ok=True)

        # Save the brightened image
        output_path = os.path.join(output_dir, "sentinel_image.png")
        plt.imsave(output_path, bright_image)
        print(f"Brightened image saved to {output_path}")
    else:
        print("No image data received.")
    # if response and len(response) > 0:
    #     image = np.array(response[0])

    #     # Create directory if not exists
    #     output_dir = "sentinel_data"
    #     os.makedirs(output_dir, exist_ok=True)

    #     # Save image
    #     output_path = os.path.join(output_dir, "sentinel_image.png")
    #     plt.imsave(output_path, image)
    #     print(f"Image saved to {output_path}")
    # else:
    #     print("No image data received.")
