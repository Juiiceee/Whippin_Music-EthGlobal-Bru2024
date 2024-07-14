import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

interface CustomNextApiRequest extends NextApiRequest {
  user: any;
}

export const authenticateToken = (req: CustomNextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.cookies.jwt_token || req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Forbidden');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }
    req.user = user;
    next();
  });
};
