export const calculatePasswordScore = (passwordValue: string) => {
  let score = 0;
  const regexPositive = ['[A-Z]', '[a-z]', '[0-9]', '[@$!%*?&]'];

  regexPositive.forEach((regex) => {
    if (new RegExp(regex).test(passwordValue)) {
      score += 1;
    }
  });
  return score;
};

export const getPasswordStrength = (password: string) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
  const score = calculatePasswordScore(password);

  if (password.length === 0) {
    return { text: '', color: 'transparent' };
  }
  if (regex.test(password) && score === 4 && password.length > 10) {
    return { text: 'Fort', color: '#28a745' };
  }
  if (score >= 2) {
    return { text: 'Moyen', color: '#ff7d5c' };
  }
  if (score >= 1) {
    return { text: 'Faible', color: '#dc3545' };
  }
  return { text: 'Faible', color: '#dc3545' };
};
