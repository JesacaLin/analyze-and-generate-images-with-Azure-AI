import React, { useState } from "react";
import analyzeImage from "./azure-image-analysis";

function App() {
  const title = "Computer Vision";
  const [value, setValue] = React.useState("");

  //create a state variable to store the URL
  const [url, setUrl] = React.useState("");
  //create a state variable to store the image analysis results
  const [imageAnalysis, setImageAnalysis] = React.useState("");
  //create a state variable to store the text prompt
  const [textPrompt, setTextPrompt] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  //declare a function to process the URL
  // const processUrl = () => {
  //   //call the API to process the URL
  //   //store the results in the state variable
  // };

  return (
    <div>
      <h1>{title}</h1>
      <h4>Insert URL or type prompt:</h4>
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
          setIsLoading(true);
          analyzeImage(value)
            .then((result) => console.log(result))
            .finally(() => setIsLoading(false));
        }}
      >
        Analyze
      </button>
      <button onClick={() => console.log("Generate")}>Generate</button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
