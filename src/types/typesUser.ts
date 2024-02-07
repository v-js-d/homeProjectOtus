export type User = {
  username: string;
  password: string;
};

export type loginResponse = {
  config: {
    data: string;
  };
  data: {
    token: string;
  };
};
