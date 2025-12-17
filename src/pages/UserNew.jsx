import { useNavigate } from "react-router-dom";

export default function UserNew() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUser = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      role: formData.get("role"),
      avatar: formData.get("avatar"),
    };

    console.log("New user body data:", newUser);

    // Later: POST to API
    alert("User created (mock)");

    navigate("/users");
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add new user</h1>
        <p className="text-sm text-slate-600">Create a new system user</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="user@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="******"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Avatar URL</label>
          <input
            name="avatar"
            type="url"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save user
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-slate-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
