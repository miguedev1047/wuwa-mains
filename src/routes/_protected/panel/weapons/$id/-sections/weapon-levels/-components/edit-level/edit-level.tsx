import type { WeaponLevelZodSchema } from "@/schemas/zod";
import { useEditLevel } from "@panel/weapons/$id/-sections/weapon-levels/-hooks/use-edit-level";
import { SELECT_LEVELS } from "@/data/constants";
import { PencilIcon } from "lucide-react";

export function EditLevel(data: WeaponLevelZodSchema) {
  const { formId, onSubmit, dialogOpen, setDialogOpen, form, isPending } =
    useEditLevel(data);

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          isEditing
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>Editar nivel</form.FormSheetTitle>
              <form.FormSheetDescription>
                Edita un nivel del arma.
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
                  <PencilIcon />
                  Guardar cambios
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
