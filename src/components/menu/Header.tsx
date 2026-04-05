import { IsMobile } from "@/utils/mobile";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";


const Header = () => {
  const isMobile = IsMobile();

  return isMobile ? <MobileMenu /> : <Menu />;
};

export default Header;

