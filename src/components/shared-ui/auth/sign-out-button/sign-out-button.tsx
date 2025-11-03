import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";

interface SignInButtonProps extends React.ComponentProps<typeof Button> {}

export function SignOutButton({ className, ...props }: SignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();

  const onSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onError: (ctx) => {
            console.log(ctx.error);
            toast.error("Ha ocurrido un error al cerrar sesion.");
          },
          onSuccess: () => {
            toast.success("Cerrando sesion...");
            navigate({ to: "/login" });
          },
        },
      });
    });
  };

  return (
    <Button onClick={onSignOut} disabled={isPending} {...props}>
      {isPending && <Spinner />}
      {!isPending && <span>Cerrar sesion</span>}
    </Button>
  );
}
