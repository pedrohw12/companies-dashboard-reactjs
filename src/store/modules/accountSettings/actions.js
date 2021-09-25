export function changeEnvironment(environment) {
  return {
    type: "@accountSettings/CHANGE_ENVIRONMENT",
    payload: { environment },
  };
}
