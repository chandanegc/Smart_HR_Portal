import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo, {VerySmallLogo } from '../../../components/Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from '../../../components/LogoutContainer';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <VerySmallLogo />
          <h4 className='logo-text'><VerySmallLogo/></h4>
        </div>
        <div className='btn-container'>
          {/* <ThemeToggle /> */}
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
