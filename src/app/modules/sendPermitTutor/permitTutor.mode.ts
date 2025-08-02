import { model, Schema } from "mongoose";
import { IRequest } from "./permitTutor.interface";


const permitSchema = new Schema<IRequest>({
    tutorId:{ type:Schema.Types.ObjectId, ref: "User", required: true },
    userEmail: {
        type: String,
        required: [true, 'Please provide your email'],
    },
    selectedDate: {type:Date},
    price: {type:Number},
    isAccept: { type: Boolean, default: false },
    isPayment: { type: Boolean, default: false },
}, { timestamps: true });


const PermitTutor = model<IRequest>('PermitTutor', permitSchema)
export default PermitTutor