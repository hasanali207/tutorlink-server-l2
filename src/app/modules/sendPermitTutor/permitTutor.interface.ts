import { Types } from "mongoose";

export interface IRequest {
    tutorId: Types.ObjectId;
    userEmail: string;
    isAccept?:boolean
    isPayment?:boolean
    selectedDate?: Date
    price?: number,
}