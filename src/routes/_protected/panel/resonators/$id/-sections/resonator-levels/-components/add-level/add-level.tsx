import { useAddLevel } from "@panel/resonators/$id/-sections/resonator-levels/-hooks/use-add-level";
import { SELECT_LEVELS } from "@/data/constants";
import { PlusIcon } from "lucide-react";

export function AddLevel() {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useAddLevel();

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>Nuevo nivel</form.FormSheetTitle>
              <form.FormSheetDescription>
                Agrega un nuevo nivel al resonador.
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="level">
                {(field) => (
                  <field.SelectField
                    label="Selecciona un nivel"
                    description="Seleccciona un nivel."
                    placeholder="Nivel 90"
                    items={SELECT_LEVELS}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="hp">
                {(field) => (
                  <field.NumberField
                    label="Vida"
                    description="Ingresa la vida del resonador."
                    placeholder="0"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="atq">
                {(field) => (
                  <field.NumberField
                    label="Ataque"
                    description="Ingresa el ataque del resonador."
                    placeholder="0"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="def">
                {(field) => (
                  <field.NumberField
                    label="Defensa"
                    description="Ingresa la defensa del resonador."
                    placeholder="0"
                    showError
                  />
                )}
              </form.AppField>
            </form.FormSheetContent>
          }
          renderFooter={
            <form.FormSheetFooter>
              <form.AppForm>
                <form.SubmitButton
                  isPending={isPending}
                  type="submit"
                  form={formId}
                >
                  <PlusIcon />
                  Agregar nivel
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
