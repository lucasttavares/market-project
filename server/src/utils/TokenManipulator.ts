import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class TokenManipulator {
  public static generateToken(user: any): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.profile,
    };
    return jwt.sign(payload, `${process.env.TOKEN_KEY}`, {
      expiresIn: 10800,
    });
  }

  public static validateToken(token: string): boolean {
    let validate = true;
    jwt.verify(token, `${process.env.TOKEN_KEY}`, error => {
      if (error) {
        validate = false;
      }
    });
    return validate;
  }

  public static decodeToken(token: string): any {
    try {
      const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      return decoded;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
