/** @format */

export type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  // user: {
  //   name: string;
  //   email: string;
  //   username: string;
  // };
};
