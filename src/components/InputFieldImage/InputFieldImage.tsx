import { ChangeEvent, useRef } from 'react';

import Button from '../Button/Button';

import './InputFieldImage.scss';

interface InputFieldImageProps {
  handleFile: (file: File) => void;
  text: string;
}

function InputFieldImage({ handleFile, text }: InputFieldImageProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];

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
      />
    </div>
  );
}

export default InputFieldImage;
