import type { ResonatorBonusZodSchema } from "@/schemas/zod/resonator-schema";
import { useEditBonus } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-hooks";
import { SELECT_STAT_TYPE } from "@/constants";
import { PencilIcon } from "lucide-react";

export function EditBonus(data: ResonatorBonusZodSchema) {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useEditBonus(data);

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          isEditing
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>Editar bonus</form.FormSheetTitle>
              <form.FormSheetDescription>
                Actualiza los campos para editar el bonus.
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="stat_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de estadística"
                    description="Ingresa el tipo de estadística."
                    placeholder="Vida"
                    items={SELECT_STAT_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="bonus_value">
                {(field) => (
                  <field.NumberField
                    label="Valor del bonus"
                    description="Ingresa el valor del bonus."
                    placeholder="2.40"
                    inputProps={{ percentIcon: true }}
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
