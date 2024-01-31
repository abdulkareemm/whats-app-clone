import jwt from"jsonwebtoken"

export const sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn,
      },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
};

export const verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) resolve(null);
      else resolve(payload);
    });
  });
};
