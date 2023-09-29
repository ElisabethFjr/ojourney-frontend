import { ChangeEvent, useRef } from 'react';

import Button from '../Button/Button';

import './InputFieldImage.scss';

interface InputFieldImageProps {
  handleFile: (file: File) => void;
}

function InputFieldImage({ handleFile }: InputFieldImageProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    console.log(fileUploaded);

    if (fileUploaded) {
      handleFile(fileUploaded);
    }
  };

  return (
    <div className="field">
      <label
        className="field-image-label visually-hidden"
        htmlFor="field-image-input"
      >
        Ajouter une image
      </label>
      <input
        className="field-image-input-file"
        onChange={handleChange}
        name="url_image"
        accept="image/png, image/jpeg, image/gif"
        id="field-input-image"
        type="file"
        ref={hiddenFileInput}
      />
      <Button
        text="Ajouter une image"
        customClass="outline button-style--width"
        type="button"
        onClick={handleClick}
        icon="fa-regular fa-image"
      />
    </div>
  );
}

export default InputFieldImage;
