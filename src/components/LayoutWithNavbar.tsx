import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
export function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
