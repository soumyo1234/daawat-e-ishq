// OAuth Configuration
export const OAUTH_CONFIG = {
  GOOGLE: {
    CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    SCOPES: 'email profile'
  },
  FACEBOOK: {
    APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
    SCOPES: 'email,public_profile'
  }
};

// Instructions to get OAuth credentials:
// 
// Google OAuth Setup:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
// 5. Set authorized origins: http://localhost:3000
// 6. Set authorized redirect URIs: http://localhost:3000
// 7. Copy the Client ID and replace YOUR_GOOGLE_CLIENT_ID above
//
// Facebook OAuth Setup:
// 1. Go to https://developers.facebook.com/
// 2. Create a new app
// 3. Add Facebook Login product
// 4. Go to Settings → Basic
// 5. Copy the App ID and replace YOUR_FACEBOOK_APP_ID above
// 6. Add http://localhost:3000 to Valid OAuth Redirect URIs
