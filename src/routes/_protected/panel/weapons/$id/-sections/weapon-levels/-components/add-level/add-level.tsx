import { useAddLevel } from "@panel/weapons/$id/-sections/weapon-levels/-hooks/use-add-level";
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
                Agrega un nuevo nivel al arma.
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
              <form.AppField name="atk">
                {(field) => (
                  <field.NumberField
                    label="Ataque"
                    description="Ingresa el ataque del arma."
                    placeholder="0"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stat_value">
                {(field) => (
                  <field.NumberField
                    label="Valor de la estadistica"
                    description="Ingresa el valor de la estadistica."
                    inputProps={{ percentIcon: true }}
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
