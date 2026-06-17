import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiUrlHint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/...`
    : 'http://localhost:8000/api/...';

  return (
    <div className="app-shell">
      <header>
        <div className="branding">
          <h1>OctoFit Tracker</h1>
          <p>
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to
            build Codespaces API URLs.
          </p>
          <p>
            API base: <code>{apiUrlHint}</code>
          </p>
          <p>
            {codespaceName
              ? 'Codespaces environment enabled.'
              : 'No VITE_CODESPACE_NAME set; using localhost fallback.'}
          </p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome to OctoFit Tracker</h2>
                <p>
                  This frontend uses <code>import.meta.env.VITE_CODESPACE_NAME</code>{' '}
                  to determine whether to target the Codespaces API URL or the
                  localhost fallback.
                </p>
                <p>
                  If you are running in Codespaces, add{' '}
                  <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.
                </p>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
