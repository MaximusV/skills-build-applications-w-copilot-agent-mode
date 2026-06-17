import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const fetchUsers = async () => {
  const response = await fetch(`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`);
  return response.json();
};

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.users ?? [];
        setUsers(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.id}>{user.name ?? user.email}</li>
        ))}
      </ul>
    </section>
  );
}
