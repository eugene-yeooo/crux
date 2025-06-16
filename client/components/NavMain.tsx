import { NavLink } from 'react-router';
import { User, MapPlus, LayoutDashboard, Send } from 'lucide-react';

export default function NavMain() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors px-3 py-4 font-medium ${
      isActive
        ? 'bg-brandPrimary text-brandBlack font-black inline-flex items-center gap-1'
        : 'text-brandBlack hover:bg-brandBlack hover:text-white inline-flex items-center gap-1'
    }`;

    const iconSize = 21
    const iconStyle = "mr-2"

  return (
    <nav className="bg-white p-0 rounded-lg shadow-lg w-full border">
      <div className="flex flex-col space-y-2">
        <NavLink to="/log-nav" className={navLinkClass}><Send size={19} className={iconStyle} />Log a send</NavLink>
        <NavLink to="/user/eugeneyeooo" className={navLinkClass}><User size={iconSize} className={iconStyle} />Profile</NavLink>
        <NavLink to="/" className={navLinkClass}><LayoutDashboard size={iconSize} className={iconStyle} />Dashboard</NavLink>
        <NavLink to="/explore" className={navLinkClass}><MapPlus size={iconSize} className={iconStyle} />Explore</NavLink>
      </div>
    </nav>
  );
}
 