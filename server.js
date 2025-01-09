const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Clarifai API configuration
const PAT = 'c7ff400323504ac1ab84496d0be90b47';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001; // Change if port 3001 is in use

// **Clarifai API Route**
app.post('/api/clarifai', async (req, res) => {
  const { imageUrl } = req.body;

  console.log('Received imageUrl:', imageUrl);

  if (!imageUrl) {
    console.error('No imageUrl provided in the request body.');
    return res.status(400).json({ message: 'No imageUrl provided' });
  }

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT,
      'Content-Type': 'application/json'
    },
    body: raw
  };

  try {
    const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
    const result = await response.json();

    if (result.outputs && result.outputs[0].data.regions) {
      const regions = result.outputs[0].data.regions;

      // Optionally, log the bounding box data
      regions.forEach(region => {
        const boundingBox = region.region_info.bounding_box;
        const topRow = boundingBox.top_row.toFixed(3);
        const leftCol = boundingBox.left_col.toFixed(3);
        const bottomRow = boundingBox.bottom_row.toFixed(3);
        const rightCol = boundingBox.right_col.toFixed(3);

        console.log(`BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
      });

      // Send the regions data back to the frontend
      res.json(result);
    } else {
      console.error('No regions found in Clarifai response.');
      res.status(400).json({ message: 'No face detected or invalid response from Clarifai' });
    }
  } catch (error) {
    console.error('Error calling Clarifai API:', error);
    res.status(500).json({ message: 'Error calling Clarifai API', error });
  }
});

// **Start the Server**
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});