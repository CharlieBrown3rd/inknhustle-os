import { useState } from "react";
import { supabase } from "../../lib/supabase";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data.session) {
      onLogin?.(data.session);
    }
  };

  return (
    <section className="admin-login">
      <div className="admin-login-card">
        <span>InknHustle Admin</span>

        <h2>Sign In</h2>

        <p>
          Sign in to review incoming projects and manage
          production.
        </p>

        <form
          className="admin-login-form"
          onSubmit={handleLogin}
        >
          <label>
            Email Address

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          {errorMessage && (
            <p className="admin-login-error">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;