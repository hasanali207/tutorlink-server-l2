import { model, Schema, Document } from "mongoose";

interface IPayment extends Document {
  userEmail: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  amount: number;
  selectedDate: Date;
  requestId: string;
  transaction: string;
  paidStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IPayment>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    tutorId: {
      type: String,
      required: true,
    },
    tutorName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    requestId: {
      type: String,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
      unique: true,
    },
    paidStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model<IPayment>("Payment", OrderSchema);
export default Payment;
