import { Dropdown, Logo } from "./components";

export default function Header() {
  return (
    <div className="shadow">
      <div className="h-14 py-3 px-4 flex items-center justify-between max-w-7xl m-auto">
        <Logo />
        <Dropdown />
      </div>
    </div>
  );
}
