import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const fetchLeaderboard = async () => {
  const response = await fetch(apiUrl('/leaderboard'));
  return response.json();
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard()
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.leaderboard ?? [];
        setEntries(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id}>
            {entry.rank ?? 'N/A'} - {entry.user?.name ?? entry.team?.name ?? 'Entry'} ({entry.score})
          </li>
        ))}
      </ol>
    </section>
  );
}
