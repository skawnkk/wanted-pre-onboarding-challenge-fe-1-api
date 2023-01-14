import { atom } from 'recoil';

export enum POST_STATE{
  READ='read',
  EDIT='edit'
}

const detailStateAtom = atom({
  key: 'detailState',
  default: POST_STATE.READ
});

export { detailStateAtom };
