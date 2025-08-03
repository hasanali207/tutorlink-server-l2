import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import { TUser, UserModel } from './user.interface';
import Config from '../../Config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image:{type:String},
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Tutor'], required: true },
    bio: { type: String },
    subjects: { type: String },
    gradeLevel: { type: String },
    availability: {
      from: { type: Date }, // Start date of availability
      to: { type: Date }, // End date of availability
    },
    price: { type: Number },
    ratings: [
      {
        studentId: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    phone:{type:String},
    address:{type:String},
    averageRating: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// / pre middleware function
// using to hide the original password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(Config.bcrypt_salts_round),
  );
  next();
});

//  hide to save the password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
// for check password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// this middleware is used to hide the deleted data from searching individual
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// this middleware is used to hide the deleted data from searching individual
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const User = model<TUser, UserModel>('User', userSchema);
