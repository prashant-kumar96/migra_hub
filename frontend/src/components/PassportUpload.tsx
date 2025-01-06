import React, { useState } from "react";
import axios from "axios";

const PassportUpload = () => {
  const [passportImages, setPassportImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setPassportImages([...passportImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image deletion from preview
  const handleDeleteImage = (index) => {
    setPassportImages(passportImages.filter((_, i) => i !== index));
  };

  // Submit images to the API
  const handleSubmit = async () => {
    const formData = new FormData();
    passportImages.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}upload-passport-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Images uploaded successfully");
      closeModal(); // Close the modal after successful upload
      setPassportImages([]); // Clear images after upload
    } catch (error) {
      console.error(error);
      alert("Error uploading images");
    }
  };

  return (
    <div className="passport-upload-container p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded dark:text-gray-800"
      >
        Upload Passport Images
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Upload and Preview Images
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
                <h3 className="text-md font-semibold mb-2">
                  Passport Preview:
                </h3>
                <div className="grid grid-cols-2 gap-4">
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

            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportUpload;
