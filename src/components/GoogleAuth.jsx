import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { OAUTH_CONFIG } from '../config/oauth';

const GoogleAuth = ({ onSuccess, onError }) => {
  return (
    <div className="google-btn-container">
      <GoogleOAuthProvider clientId={OAUTH_CONFIG.GOOGLE.CLIENT_ID}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log('GoogleLogin onSuccess event:', res);
            onSuccess && onSuccess(res);
          }}
          onError={(err) => {
            console.error('GoogleLogin onError event:', err);
            onError && onError(err);
          }}
          useOneTap={false}
          theme="filled_black"
          shape="pill"
          locale="en"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;
