import produce from "immer";

const INITIAL_STATE = {
  loading: false,
  error: {},
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@sign/SIGN_IN_REQUEST":
      case "@sign/SIGN_UP_REQUEST":
        draft.loading = true;
        draft.error = {};
        break;

      case "@sign/SIGN_IN_SUCCESS":
      case "@sign/SIGN_UP_SUCCESS":
        draft.loading = false;
        break;

      case "@sign/SIGN_FAILURE":
      case "@sign/SIGN_UP_FAILURE":
        draft.loading = false;
        draft.error = action.payload;
        break;

      default:
    }
  });
}
