import { authUserControllerGiteeLogin as giteeLogin } from "@/servers/go_study_server/authUser";

import { LoadingPage } from "../../components";
import { useOAuthLogin } from "../../hooks";

export default function GiteePage() {
  useOAuthLogin("code", code => {
    return giteeLogin({ code }).then(res => res.data.access_token);
  });

  return (
    <LoadingPage
      platform="Gitee"
      PlatformIcon={() => (
        <img
          src="/images/gitee.svg"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}></img>
      )}
    />
  );
}
