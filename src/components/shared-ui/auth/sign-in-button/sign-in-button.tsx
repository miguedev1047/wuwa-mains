import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";

interface SignInButtonProps extends React.ComponentProps<typeof Button> {
  provider: "google" | "github" | "discord";
}

export function SignInButton({
  provider,
  className,
  children,
  ...props
}: SignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: "/panel/home",
        fetchOptions: {
          onError: (ctx) => {
            console.log(ctx.error);
            toast.error("Ha ocurrido un error al iniciar sesion.");
          },
          onSuccess: () => {
            toast.success("Iniciando sesion...");
          },
        },
      });
    });
  };

  return (
    <Button
      onClick={onSignIn}
      disabled={isPending}
      className={cn("w-full", className)}
      {...props}
    >
      {isPending && <Spinner />}
      {!isPending && <span>{children}</span>}
    </Button>
  );
}
