const generateImage = async (prompt) => {
  console.log("Prompt:", prompt);

  const requestBody = {
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  };

  console.log("Request body:", requestBody);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY2}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data && data.data) {
      return data.data[0]; // Return the first generated image
    } else {
      console.error("Unexpected response format");
    }
  } else {
    console.error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result.data[0]; // Return the first generated image
};

export default generateImage;
