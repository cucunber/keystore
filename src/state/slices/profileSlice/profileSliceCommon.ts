export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: number;
};

export type Profile = {
  user: User;
};

export const initialState: Profile = {
  user: {
    firstName: 'Name',
    lastName: 'Surname',
    email: 'sarahjane@mail.com',
    phone: '+27 83 445 5423',
    level: 0,
  },
};
