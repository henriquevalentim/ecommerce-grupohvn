import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { SocialIcon } from "react-social-icons";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

export default function GroupSocialLogin() {
  const navigate = useNavigate();

  const responseFacebook = async (responseCallback) => {
    try {
      const body = {
        email: responseCallback.email,
        name: responseCallback.name,
        typeLogin: "facebook",
      };

      const response = await api.post("/user/loginSocial", body);
      const decode = jwt_decode(response.data.token);
      const isAdmin = decode?.permission?.includes("ADMIN");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", decode.email);
      localStorage.setItem("name", decode.name);
      localStorage.setItem("id", decode.id);
      localStorage.setItem("isAdmin", isAdmin);
      navigate("/");
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email"
        callback={responseFacebook}
        render={(renderProps) => (
          <SocialIcon
            onClick={renderProps.onClick}
            network="facebook"
            style={{ height: 50, width: 50, cursor: "pointer" }}
          />
        )}
      />

      <SocialIcon
        network="linkedin"
        style={{ height: 50, width: 50, cursor: "pointer" }}
      />
      <SocialIcon
        network="google"
        style={{ height: 50, width: 50, cursor: "pointer" }}
      />
      <SocialIcon
        network="github"
        style={{ height: 50, width: 50, cursor: "pointer" }}
      />
      <SocialIcon
        network="discord"
        style={{ height: 50, width: 50, cursor: "pointer" }}
      />
    </div>
  );
}
