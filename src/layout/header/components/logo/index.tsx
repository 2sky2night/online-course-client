import { APP_NAME } from "@/constants";
import { useLogoStyles } from "./styles";

export function Logo() {
  const { styles } = useLogoStyles();
  return <span className={styles.logo}>{APP_NAME}</span>;
}
