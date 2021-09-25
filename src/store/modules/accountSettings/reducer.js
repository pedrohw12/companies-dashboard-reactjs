import produce from "immer";

const INITIAL_STATE = {
  environment: "sandbox",
};

export default function accountSettings(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@accountSettings/CHANGE_ENVIRONMENT":
        draft.environment = action.payload.environment;
        break;

      default:
    }
  });
}
