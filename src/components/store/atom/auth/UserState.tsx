import { atom } from 'recoil';
import USER from 'types/User';

export const userState = atom<USER[]>({
  key: "userState",// MUST unique
  default: [
    {
      id: 999,
      name: 'Masanarea',
      email: 'masa.php.engineer@gmail.com',
      password: 'qwsaqwsa',
    },
  ],
});