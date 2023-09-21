import { useState, ChangeEvent } from 'react';
import './InputFieldImage.scss';

function InputFieldImage() {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="field">
      <label className="field-label-image visually-hidden" htmlFor="url_image">
        Ajouter une image
      </label>
      <input
        className="field-input-image"
        value={value}
        onChange={handleChange}
        name="url_image"
        accept="image/png, image/jpeg, image/gif"
        id="field-input-image"
        type="file"
      />
    </div>
  );
}

export default InputFieldImage;
