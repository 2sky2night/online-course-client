import { Logo } from "./components";
import { Nav } from "./components";
export default function Header() {
  return (
    <div className="shadow">
      <div className="h-14 px-4 flex items-center justify-between max-w-7xl m-auto">
        <Logo></Logo>
        <Nav></Nav>
      </div>
    </div>
  );
}
