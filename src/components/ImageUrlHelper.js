import React, { useState } from 'react';
import { convertGoogleDriveUrl } from '../utils/imageUtils';
import './ImageUrlHelper.css';

const ImageUrlHelper = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [showHelper, setShowHelper] = useState(false);

  const handleConvert = () => {
    const converted = convertGoogleDriveUrl(inputUrl);
    setConvertedUrl(converted);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="image-url-helper">
      <button 
        className="helper-toggle-btn"
        onClick={() => setShowHelper(!showHelper)}
      >
        {showHelper ? 'Hide' : 'Show'} Image URL Helper
      </button>
      
      {showHelper && (
        <div className="helper-content">
          <h3>🔧 Google Drive Image URL Converter</h3>
          <p>Convert Google Drive sharing links to direct image URLs that work in your portfolio.</p>
          
          <div className="url-converter">
            <label htmlFor="input-url">Google Drive URL:</label>
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/FILE_ID/view"
              className="url-input"
            />
            <button onClick={handleConvert} className="convert-btn">
              Convert
            </button>
            
            {convertedUrl && (
              <div className="converted-url">
                <label>Direct Image URL:</label>
                <div className="url-display">
                  <input
                    type="text"
                    value={convertedUrl}
                    readOnly
                    className="url-output"
                  />
                  <button 
                    onClick={() => copyToClipboard(convertedUrl)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="instructions">
            <h4>📋 How to get Google Drive direct image URLs:</h4>
            <ol>
              <li>Upload your image to Google Drive</li>
              <li>Right-click on the image and select "Get link"</li>
              <li>Make sure the link sharing is set to "Anyone with the link can view"</li>
              <li>Copy the sharing link (it will look like: <code>https://drive.google.com/file/d/FILE_ID/view</code>)</li>
              <li>Paste it in the converter above to get the direct image URL</li>
              <li>Use the converted URL in your Firebase project data</li>
            </ol>
            
            <div className="example">
              <strong>Example:</strong><br/>
              <code>https://drive.google.com/file/d/1EzwrfwsU6M0GPUCxRRvaKwsB8pEq41Ud/view</code><br/>
              <span>↓ converts to ↓</span><br/>
              <code>https://drive.google.com/uc?export=view&id=1EzwrfwsU6M0GPUCxRRvaKwsB8pEq41Ud</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUrlHelper;
