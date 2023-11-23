import React, { useState } from "react";
import analyzeImage from "./azure-image-analysis";
import generateImage from "./azure-image-generation";

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

function DisplayGeneratedResults({ result, generatedImage, generatedResult }) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <h2>Generated Results</h2>
      <img
        src={generatedImage}
        alt="Generated"
        style={{
          width: "500px",
          borderRadius: "8px",
          padding: "4px",
        }}
      />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

function App() {
  const title = "Computer Vision";
  const [value, setValue] = React.useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedResult, setGeneratedResult] = useState(null);

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
          setImageUrl(value);
          setIsLoading(true);
          analyzeImage(value)
            .then((result) => {
              console.log(result);
              setImageAnalysis(result);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setIsLoading(false));
        }}
      >
        Analyze
      </button>

      <button
        onClick={() => {
          setIsLoading(true);
          generateImage(value)
            .then((result) => {
              console.log(result);
              setGeneratedResult(result);
              setGeneratedImage(result.url);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => setIsLoading(false));
        }}
      >
        Generate
      </button>

      {isLoading && <p>Loading...</p>}

      <DisplayResults result={imageAnalysis} image={imageUrl} url={imageUrl} />

      <DisplayGeneratedResults
        result={generatedResult}
        generatedImage={generatedImage}
      />
    </div>
  );
}

export default App;
