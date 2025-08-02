export type TLoginUser = {
  email: string;
  password: string;
};
export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  role: 'Student' | 'Tutor';
}
