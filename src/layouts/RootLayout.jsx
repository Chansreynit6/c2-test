import { NavLink, Outlet } from "react-router-dom";

const navClass = ({ isActive }) => {
  const activeLink = isActive
    ? "bg-slate-900 text-white"
    : "text-slate-700 hover:bg-slate-100";
  return `px-3 py-2 rounded-lg text-sm font-medium transition ${activeLink}`;
};

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">WMAD ONLINE</div>

          <nav className="flex gap-2">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/users" className={navClass}>
              Users
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
