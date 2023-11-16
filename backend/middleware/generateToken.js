import JWT from 'jsonwebtoken';

// User token
export const userToken = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Create activation token
export const activationToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });
};
