export function signInRequest(email, password) {
  return {
    type: "@sign/SIGN_IN_REQUEST",
    payload: { email, password },
  };
}

export function signInSuccess(token, userName) {
  return {
    type: "@sign/SIGN_IN_SUCCESS",
    payload: { token, userName },
  };
}

export function signUpRequest(
  name,
  phone,
  document,
  legal_responsible,
  email,
  password,
  address_postal_code,
  address,
  address_number,
  address_complement,
  address_neighborhood,
  address_state,
  address_city,
  country,
  ip
) {
  return {
    type: "@sign/SIGN_UP_REQUEST",
    payload: {
      name,
      phone,
      document,
      legal_responsible,
      email,
      password,
      address_postal_code,
      address,
      address_number,
      address_complement,
      address_neighborhood,
      address_state,
      address_city,
      country,
      ip,
    },
  };
}

export function signUpSuccess(token, userName) {
  return {
    type: "@sign/SIGN_UP_SUCCESS",
    payload: { token, userName },
  };
}

export function signFailure() {
  return {
    type: "@sign/SIGN_FAILURE",
  };
}

export function signUpFailure(payload) {
  return {
    type: "@sign/SIGN_UP_FAILURE",
    payload,
  };
}
