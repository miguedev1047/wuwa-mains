import { SignInButton } from "@/components/shared-ui/auth/sign-in-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="space-y-6 max-w-[400px] w-full">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-bold">Iniciar sesion</h2>
          <p className="text-muted-foreground">
            Inicia sesión para acceder a tu cuenta de Wuwa Diary.
          </p>
        </div>
        <SignInButton provider="google">Iniciar sesion con Google</SignInButton>
        <SignInButton provider="discord">
          Iniciar sesion con Discord
        </SignInButton>
      </div>
    </main>
  );
}
