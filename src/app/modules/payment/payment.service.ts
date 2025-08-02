import { SslCommerzPayment } from 'sslcommerz';
import Payment from './payment.model';
import PermitTutor from '../sendPermitTutor/permitTutor.mode';

const sslcommerz = new SslCommerzPayment(
  process.env.STORE_ID as string,
  process.env.STORE_PASSWORD as string,
  false // live হলে true করো
);

interface PaymentParams {
  requestId: string;
  selectedDate: Date | string;
  amount: number;
  tutorId?: string;
  tutorName?: string;
  userEmail?: string;
  subject?: string;
  totalAmount?: number;
  transaction?: string;
}

export const processPayment = async (params: PaymentParams): Promise<string> => {
  const {
    requestId,
    selectedDate,
    tutorId,
    tutorName,
    userEmail,
    subject,
    amount, // fallback
    transaction,
  } = params;

  console.log(params)
  const transactionId = transaction || `txn_${Date.now()}`;


  // Validate and parse selectedDate
  const parsedDate = new Date(selectedDate);

 
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid selectedDate provided");
  }

  // Update PermitTutor with proper date
  const updatedRequest = await PermitTutor.findByIdAndUpdate(
    requestId,
    { selectedDate: parsedDate, price: amount },
    { new: true }
  );

  if (!updatedRequest) {
    throw new Error("Request not found");
  }


  // Step 2: Fallback values from updatedRequest if not in params
  const tutorNameFinal = tutorName || (typeof updatedRequest.tutorId === 'object' && updatedRequest.tutorId !== null
    ? (updatedRequest.tutorId as any).name || 'Unknown Tutor'
    : 'Unknown Tutor');

  const tutorIdFinal = tutorId || (typeof updatedRequest.tutorId === 'string'
    ? updatedRequest.tutorId
    : (updatedRequest.tutorId as any)?._id);

  const userEmailFinal = userEmail || updatedRequest.userEmail || 'noemail@example.com';

  // Step 3: Prepare Payment Data
  const paymentData = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `http://localhost:5000/api/payment/success/${transactionId}`,
    fail_url: `http://localhost:5000/api/payment/fail`,
    cancel_url: `http://localhost:5000/api/payment/cancel`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: tutorNameFinal,
    product_category: subject || 'Unknown Subject',
    product_profile: 'general',
    cus_name: userEmailFinal,
    cus_email: userEmailFinal,
    cus_phone: '01700000000',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  // Step 4: Init payment
  const response = await sslcommerz.init(paymentData);

  // Step 5: Save to Payment collection
  const finalOrder = {
    items: 'Tutor Booking',
    paidStatus: true,
    requestId,
    transaction: transactionId,
    tutorId: tutorIdFinal,
    tutorName: tutorNameFinal,
    amount,
    userEmail: userEmailFinal,
    selectedDate: parsedDate,
    subject: subject
  };

  const createdOrder = await Payment.create(finalOrder);
  console.log('Order Saved:', createdOrder);

  return response.GatewayPageURL;
};
