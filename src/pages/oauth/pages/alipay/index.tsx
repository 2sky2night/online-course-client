import { authUserControllerAlipayLogin as alipayLogin } from "@/servers/go_study_server/authUser";
import { LoadingPage } from "../../components";
import { useOAuthLogin } from "../../hooks";

export default function AlipayPage() {
  useOAuthLogin("auth_code", code => {
    return alipayLogin({ code }).then(res => res.data.access_token);
  });
  return (
    <LoadingPage
      platform="Alipay"
      PlatformIcon={() => (
        <img
          src="/images/alipay.svg"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}></img>
      )}
    />
  );
}
