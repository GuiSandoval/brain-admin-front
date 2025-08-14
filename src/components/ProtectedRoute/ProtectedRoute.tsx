"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedRoles, redirectTo }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        switch (user.role) {
          case "ESTUDANTE":
            router.push("/aluno");
            break;
          case "PROFESSOR":
            router.push("/professor");
            break;
          case "ADMIN":
            router.push("/admin");
            break;
          default:
            router.push("/");
        }
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
