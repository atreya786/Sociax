import { useState } from "react";
import React from "react";

const ImageUpload = ({ onSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onSelect(file);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full max-h-60 object-cover rounded"
        />
      )}
    </div>
  );
};

export default ImageUpload;
