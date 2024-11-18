import AfterLoginLayout from "@/components/AfterLoginLayout";
import React, { useState } from "react";
import countryList from "react-select-country-list";
import "react-country-state-city/dist/react-country-state-city.css";
import DocumentUploadComp from "@/components/DocumentUploadComp";

const DocumentUpload = () => {
  const [passportImages, setPassportImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result); // Add each image data URL to newImages array
        if (newImages.length === files.length) {
          setPassportImages([...passportImages, ...newImages]); // Update state after all files are read
        }
      };
      reader.readAsDataURL(file); // Read file as data URL for preview
    });
  };

  const handleDeleteImage = (index) => {
    setPassportImages(passportImages.filter((_, i) => i !== index));
  };

    return (
    <div className="w-full">
      <div>
        {/* <DocumentUploadComp /> */}
        <div className="passport-upload-container p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-semibold mb-4">
            Upload Your Passport Images
          </h2>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-4 w-full border border-gray-300 p-2 rounded"
          />

          {passportImages.length > 0 && (
            <div className="passport-preview mt-4">
              <h3 className="text-md font-semibold mb-2">Passport Preview:</h3>
              <div className="flex flex-col gap-6">
                {passportImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Passport Preview ${index + 1}`}
                      className="w-full h-auto border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);
