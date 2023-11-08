// Import React & Hooks
import { ChangeEvent, useState } from 'react';
// Import DOMPurify
import DOMPurify from 'dompurify';
// Import Utils Functions
import {
  calculatePasswordScore,
  getPasswordStrength,
} from '../../utils/passwordStrength';
// Import Styles
import './InputPassword.scss';

function InputPassword() {
  // Declaration state variables
  const [password, setPassword] = useState<string>(''); // Password value
  const [focused, setFocused] = useState<boolean>(false); // Focus on the password input

  // EVENT HANDLER on the input change value
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setPassword(sanitizedValue);
  };

  // Change password progress bar color & width depending on the password strength indicator (score)
  const changePasswordColor = () => {
    // Regular expression to check strength password
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^0-9a-zA-Z]).{10,}$/;
    // Calculate the password score and retrieve the strength information
    const score = calculatePasswordScore(password);
    const strengthInfo = getPasswordStrength(password);
    // Adjust the progress bar style based on password strength
    if (regex.test(password) && score === 4 && password.length > 10) {
      return {
        width: '100%',
        background: strengthInfo.color,
      };
    }
    if (score >= 2 && password.length > 8) {
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
    <div className="field field-password-">
      <label className="field-label" htmlFor="password">
        Mot de passe
      </label>
      <input
        className="field-input"
        value={password}
        onChange={handleChange}
        name="password"
        required
        autoComplete="off"
        id="password"
        type="password"
        placeholder="Mot de passe"
        maxLength={128}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className="field-icon">
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
