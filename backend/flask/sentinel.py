from sentinelhub import BBox, CRS, MimeType, SentinelHubRequest, DataCollection

# Define bounding box and time range
bbox = BBox([77.5, 28.4, 77.6, 28.5], CRS.WGS84)
time_interval = ('2025-01-01', '2025-01-28')

# Create request
request = SentinelHubRequest(
    data_folder='sentinel_data',
    evalscript="""
        // Set up visualization script
        return [B04, B03, B02]; // RGB bands
    """,
    input_data=[
        SentinelHubRequest.input_data(
            data_collection=DataCollection.SENTINEL2_L1C,
            time_interval=time_interval
        )
    ],
    bbox=bbox,
    size=(512, 512),
    mime_type=MimeType.PNG
)

response = request.get_data()
# Save or process response as an image
