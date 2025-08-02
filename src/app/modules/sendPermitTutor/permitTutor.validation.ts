import { z } from "zod";

export const permitSchema = z.object({
    body: z.object({
        tutorId:  z.string().optional(),
        userEmail: z.string().email("Invalid email format").nonempty("Email is required"),
        isAccept: z.boolean().default(false),
        isPayment: z.boolean().default(false),
        price:z.number().optional(),
        selectedDate: z.date().optional()
    })

});