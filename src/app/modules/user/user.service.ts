import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async () => {
  const result = await User.find();

  return result;
};

const getAllTutors = async () => {
  const result = await User.find({ role: 'Tutor' });
  return result;
};


const getTutorById = async (id: string) => {
  const tutor = await User.findOne({ _id: id, role: 'Tutor' });

  if (!tutor) {
    throw Error('Tutor not found!');
  }

  return tutor;
};
const getUser = async (id: string) => {
  const result = await User.findById(id);
  if (result == null) {
    throw Error('User is not exist');
  }
  return result;
};

const updateUser = async (email: string, payload: Partial<TUser>) => {
  const isUsersExists = await User.findOne({ email });
  if (!isUsersExists) {
    throw new Error('This User is not found!');
  }

  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
    upsert: true,
  });

  return result;
};

export const userServices = {
  getAllUsers,
  updateUser,
  getAllTutors,
  getTutorById,
  getUser,
};
