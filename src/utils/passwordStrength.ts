// Calculate the password strength score based on positive regex
export const calculatePasswordScore = (passwordValue: string) => {
  let score = 0;
  const regexPositive = ['[A-Z]', '[a-z]', '[0-9]', '[^0-9a-zA-Z]'];

  regexPositive.forEach((regex) => {
    // Check if the passwordValue matches the current regex pattern
    if (new RegExp(regex).test(passwordValue)) {
      score += 1; // Increment the score if a match is found
    }
  });
  return score;
};

// Get the password strength with its associated color and text based on the score, length and regex test
export const getPasswordStrength = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z]).{10,}$/;
  const score = calculatePasswordScore(password);
  // If the input password is empty, return no text and transparent color
  if (password.length === 0) {
    return { text: '', color: 'transparent' };
  }
  if (regex.test(password) && score === 4 && password.length > 10) {
    return { text: 'Fort', color: '#28a745' };
  }
  if (score >= 2 && password.length > 8) {
    return { text: 'Moyen', color: '#ff7d5c' };
  }
  if (score >= 1) {
    return { text: 'Faible', color: '#dc3545' };
  }
  return { text: 'Faible', color: '#dc3545' };
};
