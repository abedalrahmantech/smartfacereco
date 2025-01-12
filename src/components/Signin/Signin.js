import React, { useState } from 'react';

const Signin = ({ onRouteChange, loadUser }) => {
  // Local state for username & password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitSignIn = () => {
    // NOTE: We're sending 'username' equal to 'email' here
    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email, // pass email as 'username'
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        // If login is successful, data.user contains the user object
        if (data.user && data.token) {
          loadUser(data.user);        // update user in App state
          onRouteChange('home');      // navigate to homepage
        } else {
          console.log('Invalid credentials or server error');
        }
      })
      .catch(err => console.log(err));
  };

  // Capture form submit and call onSubmitSignIn
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitSignIn();
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 tc">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <div className="mv3">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;