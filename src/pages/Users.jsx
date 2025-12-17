import { Link } from "react-router-dom";
import users from "../assets/data/users.json";

export default function Users() {
  const items = users;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-slate-600">Manage system users</p>
        </div>

        <Link
          to="/users/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add user
        </Link>
      </div>

      <div className="grid gap-4">
        {items.map((u) => (
          <Link
            key={u.id}
            to={`/users/${u.id}`}
            className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={u.avatar}
                alt={u.name}
                className="h-12 w-12 rounded-full object-cover border"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="font-medium truncate">{u.name}</div>
                <div className="text-sm text-slate-600 truncate">{u.email}</div>
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {u.role}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
