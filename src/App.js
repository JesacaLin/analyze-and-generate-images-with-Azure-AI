import React, { useState } from "react";
import analyzeImage from "./azure-image-analysis";

function DisplayResults({ result, url, image }) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <h2>Analysis Results</h2>
      <img
        src={image}
        alt="Analyzed"
        style={{
          width: "500px",
          borderRadius: "8px",
          padding: "4px",
        }}
      />
      <p>URL: {url}</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

function App() {
  const title = "Computer Vision";
  const [value, setValue] = React.useState("");

  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");

  return (
    <div>
      <h1>{title}</h1>
      <h4>Insert URL or type prompt: **testing**</h4>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter URL to analyze or textual prompt to generate an image"
        style={{
          width: "500px",
          height: "30px",
          borderRadius: "8px",
          border: "1px solid #000",
          padding: "4px",
        }}
      />
      <br />
      <button
        onClick={() => {
          setImage(value);
          setImageUrl(value); // Set the imageUrl state to the current value of the input field
          setIsLoading(true);
          analyzeImage(value) // Pass the current value of the input field to the analyzeImage function
            .then((result) => {
              console.log(result);
              setImageAnalysis(result); // Set the imageAnalysis state
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setIsLoading(false));
        }}
      >
        Analyze
      </button>
      <button onClick={() => console.log("Generate")}>Generate</button>
      {isLoading && <p>Loading...</p>}

      <DisplayResults result={imageAnalysis} url={imageUrl} image={image} />
    </div>
  );
}

export default App;
