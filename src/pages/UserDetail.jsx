import { Link, useParams } from "react-router-dom";
import users from "../assets/data/users.json";

export default function UserDetail() {
  const { id } = useParams();
  const userId = Number(id);

  const items = users;
  const user = items.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">User not found</h1>
        <Link to="/users" className="text-sm underline text-slate-700">
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User detail</h1>
        <Link to="/users" className="text-sm underline text-slate-700">
          Back to users
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover border"
          />
          <div>
            <div className="text-xl font-semibold">{user.name}</div>
            <div className="text-sm text-slate-600">{user.email}</div>
            <div className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {user.role}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between border-t pt-3">
            <span className="text-slate-600">User ID</span>
            <span className="font-medium">{user.id}</span>
          </div>

          <div className="flex justify-between border-t pt-3">
            <span className="text-slate-600">Created</span>
            <span className="font-medium">
              {new Date(user.creationAt).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between border-t pt-3">
            <span className="text-slate-600">Updated</span>
            <span className="font-medium">
              {new Date(user.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-lg border bg-amber-50 p-3 text-xs text-amber-900">
          <b>Note:</b> Password is in your JSON for practice only. In real apps,
          you never display or store passwords like this.
        </div>
      </div>
    </div>
  );
}
