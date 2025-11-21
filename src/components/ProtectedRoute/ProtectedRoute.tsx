"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/auth";
import { Routes } from "@/constants/enums";
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
          case UserRole.ESTUDANTE:
            router.push(Routes.HOME_ESTUDANTE);
            break;
          case UserRole.PROFESSOR:
            router.push(Routes.HOME);
            break;
          case UserRole.ADMIN:
            router.push(Routes.HOME_ADMIN);
            break;
          default:
            router.push(Routes.HOME);
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
