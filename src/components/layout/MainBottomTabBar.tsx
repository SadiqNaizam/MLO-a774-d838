import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Landmark, Repeat, Settings, LucideIcon } from 'lucide-react'; // Example icons

interface NavItem {
  path: string;
  label: string;
  Icon: LucideIcon;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', Icon: Home },
  { path: '/accounts', label: 'Accounts', Icon: Landmark },
  { path: '/transfer', label: 'Transfer', Icon: Repeat },
  { path: '/settings', label: 'Settings', Icon: Settings },
];

const MainBottomTabBar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering MainBottomTabBar, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container mx-auto grid h-16 max-w-lg grid-cols-4">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`inline-flex flex-col items-center justify-center px-2 hover:bg-muted ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.Icon className={`h-6 w-6 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MainBottomTabBar;