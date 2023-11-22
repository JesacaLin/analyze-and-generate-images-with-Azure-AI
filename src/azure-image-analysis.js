require("dotenv").config();

const apiKey1 = process.env.API_KEY1;
const apiKey2 = process.env.API_KEY2;

async function analyzeImage(imageUrl) {
  try {
    const response = await fetch(
      "https://imageanalyzerdevcv.cognitiveservices.azure.com/vision/v3.1/analyze?visualFeatures=Categories,Description,Color",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": apiKey1,
        },
        body: JSON.stringify({ url: imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to analyze image");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default analyzeImage;
