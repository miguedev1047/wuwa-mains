import { SELECT_STAT_TYPE } from "@/constants";
import { useAddBonus } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-hooks";
import { PlusIcon } from "lucide-react";

export function AddBonus() {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useAddBonus();

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>Nuevo bonus</form.FormSheetTitle>
              <form.FormSheetDescription>
                Rellena los campos para agregar un nuevo bonus.
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
                  <PlusIcon />
                  Agregar bonus
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
