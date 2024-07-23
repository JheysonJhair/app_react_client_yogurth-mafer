

import { useAuth } from "../hooks/AuthContext";

export function HomePage() {
  const { user } = useAuth();
  

  return (
    <div className="page-wrapper">

    </div>
  );
}
