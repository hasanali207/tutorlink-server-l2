// user.interface.ts
import { Document, Model, ObjectId, Types } from 'mongoose';
import { userRole } from './user.constant';

export interface TUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Tutor';
  bio?: string;
  subjects?: string;
  gradeLevel?: string; // For tutors
  availability?: {
    from: Date; // Start date of availability
    to: Date; // End date of availability
  };
  price?: number;
  ratings?: [
    // Array of ratings (for tutors)
    {
      studentId: ObjectId; // ID of the student who gave the rating
      rating: number; // Rating value (1-5)
      comment: string; // Optional comment
      timestamp: Date; // Date of the review
    },
  ];
  phone?:string,
  address?:string,
  averageRating?: number;
  isBlocked: boolean;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}






export type TUserRole = keyof typeof userRole;
