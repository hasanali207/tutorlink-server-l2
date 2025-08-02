// request.controller.ts
import { Request, Response } from "express"

import { StatusCodes } from "http-status-codes";

import sendResponse from "../../utilis/sendResponse";
import { permitServices } from "./permitTutor.service";
import { catchAsync } from "../../utilis/catchAsync";


const createPermit=catchAsync(async (req:Request, res:Response) => {
  const result = await permitServices.sendPermitService(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Request is sent successfully',
    data: result,
  });
});
const getAllPermits = catchAsync(async (req:Request, res:Response) => {
  const result = await permitServices.getALLPermitsFromDB();
  sendResponse(res, {
    message: 'Requests fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getPermitsByTutorId = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const requests = await permitServices.getPermitsForTutor(tutorId);

    if (!requests || requests.length === 0) {
      res.json({
        status: false,
        message: "No requests found for this tutor.",
      });
    }

    res.json({
      status: true,
      message: "Requests fetched successfully",
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

const updatePermitByTutor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body; // Contains status, comments, etc.

  const result = await permitServices.updatePermitByTutor(id, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Request updated successfully",
    data: result,
  });
});

const getPermitsByStudentEmail = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    // console.log(userEmail)
    const requests = await permitServices.getPermitsForStudent(userEmail);
    res.json({
      status: true,
      message: "Requests fetched successfully",
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


export const permitControllers = {
  createPermit,
  getPermitsByTutorId,
  getPermitsByStudentEmail,
  getAllPermits,updatePermitByTutor
};