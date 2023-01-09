import { atom } from 'recoil';

const detailState = atom({
  key: 'detailState',
  default: 'read',
});

export { detailState };
