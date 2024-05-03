import { useNavigate } from "react-router-dom";

import { APP_NAME } from "@/constants";
import { Page } from "@/enums";

import { useLogoStyles } from "./styles";

export function Logo() {
  const { styles } = useLogoStyles();
  const navigate = useNavigate();
  const handleClick = () => navigate(Page.INDEX);
  return (
    <span
      className={styles.logo}
      onClick={handleClick}>
      {APP_NAME}
    </span>
  );
}
