import DOMPurify from 'dompurify';
import { ChangeEvent, useState } from 'react';
import {
  calculatePasswordScore,
  getPasswordStrength,
} from '../../utils/passwordStrength';

import './InputPassword.scss';

function InputPassword() {
  const [password, setPassword] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setPassword(sanitizedValue);
  };

  const changePasswordColor = () => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
    const score = calculatePasswordScore(password);
    const strengthInfo = getPasswordStrength(password);
    if (regex.test(password) && score === 4 && password.length > 10) {
      return {
        width: '100%',
        background: strengthInfo.color,
      };
    }
    if (score >= 2) {
      return {
        width: '70%',
        background: strengthInfo.color,
      };
    }
    if (score >= 1) {
      return {
        width: '30%',
        background: strengthInfo.color,
      };
    }
    return {
      width: '0',
      background: strengthInfo.color,
    };
  };

  return (
    <div className="field-password">
      <input
        className="field-password-input"
        value={password}
        onChange={handleChange}
        name="password"
        required
        autoComplete="off"
        id="password"
        type="password"
        placeholder=" "
        maxLength={128}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label className="field-password-label" htmlFor="password">
        Mot de passe
      </label>
      <div className="field-password-icon">
        <i className="fa-solid fa-lock" />
      </div>

      {/* Display the password strength bar only when the input is focused */}
      {focused && (
        <div className="field-password-strength-meter">
          <div
            className="field-password-progress-bar"
            style={changePasswordColor()}
          />
          <div
            className="field-password-strength-text"
            style={{ color: getPasswordStrength(password).color }}
          >
            {getPasswordStrength(password).text}
          </div>
        </div>
      )}
    </div>
  );
}
export default InputPassword;
