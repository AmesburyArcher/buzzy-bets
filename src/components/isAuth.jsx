import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) {
    router.push("/");
  }
  return <>{children}</>;
}
