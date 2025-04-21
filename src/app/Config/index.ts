import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salts_round: process.env.BCRYPT_SALTS_ROUND,

  // JWT 
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expireIn: process.env.JWT_ACCESS_EXPIREIN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_expireIn: process.env.JWT_REFRESH_EXPIREIN,

};
