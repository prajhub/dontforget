// pages/api/validate-session.js

import { validateRequest } from '../../lib/validate-request';

export default async function handler(req: any, res: any) {
  try {
    const user = await validateRequest();
    if (user) {
      res.status(200).json({ isLoggedIn: true });
    } else {
      res.status(200).json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error('Error validating user session:', error);
    res.status(500).json({ isLoggedIn: false });
  }
}
