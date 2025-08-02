/* eslint-disable @typescript-eslint/no-explicit-any */
// payment.controller.ts
import { Request, Response } from 'express';
import {
  getBookingsForTutor,
  getMyBookingsFromDB,
  handleFailedOrCanceledPayment,
  processPayment,
} from './payment.service';

import Payment from './payment.model';

import { StatusCodes } from 'http-status-codes';
import PermitTutor from '../sendPermitTutor/permitTutor.mode';
import { catchAsync } from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const {
      requestId,
      selectedDate,
      amount,
      tutorId,
      tutorName,
      userEmail,
      subject,
      transaction,
    } = req.body;

    const paymentUrl = await processPayment({
      requestId,
      selectedDate,
      amount,
      tutorId,
      tutorName,
      userEmail,
      subject,
      transaction,
    });

    res.json({ paymentUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const successPayment = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const order = await Payment.findOne({ transaction: transactionId });
 
  await PermitTutor.findByIdAndUpdate(
    order?.requestId,
    { isPayment: true },
    { new: true },
  );

  return res.redirect(`http://localhost:50000/success/${transactionId}`); //here will add frountend base url or vercel url
};

export const failPayment = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  console.log('Payment failed', transactionId);

  const result = await handleFailedOrCanceledPayment(transactionId, 'failed');
  console.log(result, 'fail result');

  return res.redirect(`http://localhost:50000/fail`); //here will add frountend base url or vercel link
};

export const cancelPayment = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  console.log('Payment canceled', transactionId);

  const result = await handleFailedOrCanceledPayment(transactionId, 'canceled');
  console.log(result, 'cancel result');
  // if (!result) {
  //     return res.status(404).json({ error: "Transaction not found" });
  // }

  return res.redirect(`http://localhost:5000/cancel`); //here will add frountend base url or vercel link
};

export const getMyBookings = catchAsync(async (req, res) => {
  const { userEmail } = req.params;

  const result = await getMyBookingsFromDB(userEmail);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'MyBookings retrieved successfully',
    data: result,
  });
});

export const getBookingsByTutorId = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const requests = await getBookingsForTutor(tutorId);

    if (!requests || requests.length === 0) {
      res.json({
        status: false,
        message: 'No requests found for this tutor.',
      });
    }

    res.json({
      status: true,
      message: 'Requests fetched successfully',
      data: requests,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};
