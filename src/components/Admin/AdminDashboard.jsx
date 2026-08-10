import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLogin from "./AdminLogin";
import ProjectList from "./ProjectList";

function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
  await supabase.auth.signOut();
  setSession(null);
};

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      setSession(currentSession);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <p className="admin-project-message">
        Loading admin dashboard...
      </p>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={setSession} />;
  }

  return (
  <div className="admin-dashboard-shell">
    <div className="admin-dashboard-toolbar">
      <button
        type="button"
        className="admin-logout-button"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>

    <ProjectList />
  </div>
);
}

export default AdminDashboard;