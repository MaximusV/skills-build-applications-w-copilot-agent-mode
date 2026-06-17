import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

const fetchActivities = async () => {
  const response = await fetch(apiUrl('/activities'));
  return response.json();
};

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.activities ?? [];
        setActivities(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id}>
            {activity.user?.name ?? 'Unknown user'}: {activity.workout?.name ?? 'Activity'} ({activity.durationMinutes ?? 'N/A'} min)
          </li>
        ))}
      </ul>
    </section>
  );
}
