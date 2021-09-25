import produce from "immer";

const INITIAL_STATE = {
  token: null,
  userName: null,
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@sign/SIGN_IN_SUCCESS":
      case "@sign/SIGN_UP_SUCCESS":
        draft.token = action.payload.token;
        draft.userName = action.payload.userName;
        draft.signed = true;
        break;

      case "@auth/SIGN_OUT":
        draft.token = null;
        draft.signed = false;
        break;

      default:
    }
  });
}
