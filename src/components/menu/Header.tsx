import { IsMobile } from "@/utils/mobile";
import Menu from "./Menu";
import MobileHeader from "./MobileHeader";


const Header = () => {
  const isMobile = IsMobile();

  return isMobile ? <MobileHeader /> : <Menu />;
};

export default Header;

