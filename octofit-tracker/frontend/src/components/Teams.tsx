import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const fetchTeams = async () => {
  const response = await fetch(apiUrl('/teams'));
  return response.json();
};

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.teams ?? [];
        setTeams(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id}>
            {team.name} ({team.members?.length ?? 0} members)
          </li>
        ))}
      </ul>
    </section>
  );
}
