import express from "express";
import { cancelPayment, failPayment, getBookingsByTutorId, getMyBookings,  initiatePayment, successPayment } from "./payment.controller";

const router = express.Router();

router.post("/", initiatePayment);
router.post("/success/:transactionId", successPayment);
router.post("/fail", failPayment);
router.post("/cancel", cancelPayment);
router.get(
    '/my-bookings/:userEmail',
    // auth('User', 'Admin'), // ✅ Authenticated users only
    getMyBookings,
  );
  router.get(
    '/bookings/:tutorId',
    // auth('User', 'Admin'), // ✅ Authenticated users only
    getBookingsByTutorId,
  );

export const PaymentRouter= router;