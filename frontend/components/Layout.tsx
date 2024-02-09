
import React, { ReactNode, useState } from 'react';
import SidebarComponent from './SideBar';
import { Header } from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const mainContentStyle: React.CSSProperties = {
    transition: 'margin-left 0.3s ease', 
    backgroundColor: '#EDEDEE',
    marginLeft: '50px',
    marginRight: '50px',
  };
  

  return (
    <div className="h-screen layout-divider">
      {/* <SidebarComponent > */} 
        <div className="flex-1 p-4" style={mainContentStyle}>
        <Header/>
          <div>{children}</div>
        </div>
      {/* </SidebarComponent> */}
    </div>
  );
};

export default Layout;
