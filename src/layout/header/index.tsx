import { Dropdown, Logo } from "./components";
import { useHeaderStyles } from "./styles";

export default function Header() {
  const { styles } = useHeaderStyles();
  return (
    <div className={`${styles.headerContainer} shadow`}>
      <div className="h-14 py-3 px-4 flex items-center justify-between max-w-7xl m-auto">
        <Logo />
        <Dropdown />
      </div>
    </div>
  );
}
