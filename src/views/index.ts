import { GOOGLE_MAPS_API_KEY } from "../util/env";
// <script type="importmap">
// {
//   "imports": {
//     "@supabase/supabase-js": "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm",
//     "@supabase/auth-helpers-shared": "https://unpkg.com/@supabase/auth-helpers-shared@0.4.1/dist/index.mjs",
//     "jose": "https://unpkg.com/jose/dist/browser/index.js"
//   }
// }
// </script>
export const mainView = (inner?: string) => {
  return /* html */ `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title>Ridemapper</title>
    <link rel="stylesheet" href="/styles/global.css" type="text/css">
    <link rel="stylesheet" href="/styles/spinner.css" type="text/css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="ridemapper">

    <script src="https://unpkg.com/htmx.org@1.9.2"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
    <script type="module" src="/supabaseAuthModule.js"></script>
    <script src="/scripts/authHandlers.js"></script>
  </head>
  
  <body>
    <div class="main-container" id="page" hx-trigger="supabase-auth-change from:document" hx-post="/authChange" hx-swap="innerHTML">
      ${inner ? inner : ""}
    </div>
  </body>
  
  </html>
  `;
};

export const authenticatedView = (inner?: string) => {
  return /* html */ `
    <div class="authenticated-container">
      <div class="auth-controls" hx-get="/signIn" hx-swap="innerHTML" hx-trigger="signout-event from:document" hx-target=".main-container">
        <button onclick="signout()">sign out</button>
      </div>
      <ul class="nav-controls">
        <li class="nav-item">
          <button
            class="spinner-parent"
            hx-get="/stravaSettings"
            hx-target=".page-content"
            hx-swap="innerHTML"
            hx-push-url="true"
            hx-indicator
          >
            <span class="hide-on-spin">Strava Settings</span>
            <span class="spinner" />
          </button>
        </li>
        <li class="nav-item">
          <button
            class="spinner-parent"
            hx-get="/map"
            hx-target=".page-content"
            hx-swap="innerHTML"
            hx-push-url="true"
            hx-indicator
          >
            <span class="hide-on-spin">Map</span>
            <span class="spinner" />
          </button>
        </li>
      </ul>
      <div class="page-content">
        ${inner}
      </div>
    </div>
  `;
};

export const updatePasswordView = (message?: string) => {
  return /* html */ `
    <div class="unauthenticated-container">
      <div class="main-content">
        ${message ? `<p>${message}</p>` : ""}
        <form id="auth-form" hx-post="/updatePassword" hx-target=".main-container" hx-swap="innerHTML">
          <input id="password" type="password" name="password" placeholder="new password" />
          <button type="submit">update</button>
        </div>
      </div>
    </div>
  `;
};

export const signInView = (message?: string) => {
  return /* html */ `
    <div class="unauthenticated-container">
      <div class="main-content" hx-get="/authenticated" hx-swap="innerHTML" hx-trigger="signin-event from:document" hx-target=".main-container">
        ${message ? `<p>${message}</p>` : ""}
        <form id="auth-form" hx-post="/resetPassword" hx-target=".main-container" hx-swap="innerHTML">
          <input id="email" type="text" name="email" placeholder="email" />
          <input id="password" type="password" name="password" placeholder="password" />
          <button type="button" onclick="signin()">sign in</button>
          <button type="submit" class="look-like-anchor" hx-get="/checkEmail" hx-swap="innerHTML" hx-trigger="supabase-password-reset from:document" hx-target=".main-container">reset password</button>
          <button type="button" class="look-like-anchor" hx-get="/signUp" hx-target=".main-container" hx-swap="innerHTML">sign up instead</button>
        </div>
      </div>
    </div>
  `;
};

export const signUpView = (message?: string) => {
  return /* html */ `
    <div class="unauthenticated-container">
      <div class="main-content" hx-get="/checkEmail" hx-swap="innerHTML" hx-trigger="signup-event from:document">
        ${message ? `<p>${message}</p>` : ""}
        <div id="auth-form">
          <input id="email" type="text" name="email" placeholder="email" />
          <input id="password" type="password" name="password" placeholder="password" />
          <button type="button" onclick="signup()">sign up</button>
          <button type="button" class="look-like-anchor" hx-get="/signIn" hx-target=".main-container" hx-swap="innerHTML">sign in instead</button>
        </div>
      </div>
    </div>
  `;
};
