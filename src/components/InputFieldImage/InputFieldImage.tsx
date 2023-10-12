// Import React Hooks & ChangeEvent
import { ChangeEvent, useRef } from 'react';
// Import Component
import Button from '../Button/Button';
// Import Styles
import './InputFieldImage.scss';

interface InputFieldImageProps {
  handleFile: (file: File) => void;
  text: string;
}
// function add Image
function InputFieldImage({ handleFile, text }: InputFieldImageProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  // Click and Open your folders
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  // Handle the change event when a file is selected
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];

    // If a file is selected, call the handleFile function
    if (fileUploaded) {
      handleFile(fileUploaded);
    }
  };

  return (
    <div className="field">
      <label className="field-image-label visually-hidden" htmlFor="url_image">
        Ajouter une image
      </label>
      <input
        className="field-image-input-file"
        onChange={handleChange}
        name="url_image"
        accept="image/png, image/jpeg, image/gif"
        id="url_image"
        type="file"
        ref={hiddenFileInput}
      />
      <Button
        text={text}
        customClass="outline button-style--width"
        type="button"
        onClick={handleClick}
        icon="fa-regular fa-image"
        aria-label="Ajouter une image"
      />
    </div>
  );
}

export default InputFieldImage;
