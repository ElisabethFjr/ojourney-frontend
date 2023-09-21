import { ChangeEvent, useRef } from 'react';
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
    if (fileUploaded) {
      handleFile(fileUploaded);
    }
  };

  return (
    <div className="field">
      <label
        className="field-label visually-hidden"
        htmlFor="field-input-image"
      >
        Ajouter une image
      </label>
      <input
        className="field-input-file"
        onChange={handleChange}
        name="url_image"
        accept="image/png, image/jpeg, image/gif"
        id="field-input-image"
        type="file"
        ref={hiddenFileInput}
      />
      <button className="field-input-btn" type="button" onClick={handleClick}>
        <i className="fa-regular fa-image" /> Ajouter une image
      </button>
    </div>
  );
}

export default InputFieldImage;
