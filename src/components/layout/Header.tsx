import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Settings, Bell } from 'lucide-react'; // Example icons

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  // You can add more props for actions, icons, etc.
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBackButtonClick }) => {
  console.log("Rendering Header with title:", title);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBackButtonClick || (() => window.history.back())}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Example right-side icons/buttons */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;