import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const fetchWorkouts = async () => {
  const response = await fetch(`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`);
  return response.json();
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.workouts ?? [];
        setWorkouts(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.id}>
            {workout.name} - {workout.durationMinutes ?? 'N/A'} min
          </li>
        ))}
      </ul>
    </section>
  );
}
