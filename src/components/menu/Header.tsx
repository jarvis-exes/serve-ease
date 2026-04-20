import { useIsMobile } from "@/utils/mobile";
import Menu from "./Menu";
import MobileHeader from "./MobileHeader";


const Header = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <Menu />;
};

export default Header;

