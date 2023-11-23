const generateImage = async (prompt) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY2}`,
  };

  console.log(headers);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    }),
  });

  if (!response.ok) {
    throw new Error(`Image generation failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data[0]; // Return the first generated image
};

export default generateImage;
