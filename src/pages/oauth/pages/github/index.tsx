import { GithubFilled as GithubIcon } from "@ant-design/icons";

import { authUserControllerGithubLogin as githubLogin } from "@/servers/go_study_server/authUser";

import { LoadingPage } from "../../components";
import { useOAuthLogin } from "../../hooks";

export default function GithubPage() {
  useOAuthLogin("code", code => {
    return githubLogin({ code }).then(res => res.data.access_token);
  });
  return (
    <LoadingPage
      platform="Github"
      PlatformIcon={() => (
        <GithubIcon
          style={{
            fontSize: "100px",
          }}
        />
      )}
    />
  );
}
