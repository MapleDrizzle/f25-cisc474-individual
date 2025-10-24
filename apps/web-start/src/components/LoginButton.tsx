import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated &&  (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;