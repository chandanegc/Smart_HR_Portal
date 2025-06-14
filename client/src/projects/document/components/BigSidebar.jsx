import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { VerySmallLogo } from "../../../components/Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <VerySmallLogo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
