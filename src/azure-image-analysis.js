const analyzeImage = async (imageUrl) => {
  const response = await fetch(
    "https://ImageAnalyzerDevCV.cognitiveservices.azure.com/vision/v3.0/analyze?visualFeatures=Categories&details=Landmarks&language=en&visualFeatures=Description",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.API_KEY,
      },
      body: JSON.stringify({ url: imageUrl }),
    }
  );

  if (!response.ok) {
    throw new Error(`Image analysis failed: ${response.statusText}`);
  }

  return await response.json();
};

export default analyzeImage;
