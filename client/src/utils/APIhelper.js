const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const verifyApi = (token) => {
  return fetch('/api/account/verify?token=' + token, { headers })
      .then(res => res.json());
}

export const signinApi = (signInEmail, signInPassword) => {
  return fetch('/api/account/signin', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword,
    })
  })
    .then(res => res.json())
}

export const signupApi = (signUpFirstName, signUpLastName, signUpEmail, signUpPassword) => {
  return fetch('/api/account/signup', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      firstName: signUpFirstName,
      lastName: signUpLastName,
      email: signUpEmail,
      password: signUpPassword,
    })
  })
    .then(res => res.json())
}

export const logoutApi = (token) => {
  return fetch('/api/account/logout?token=' + token, { headers })
      .then(res => res.json());
}
