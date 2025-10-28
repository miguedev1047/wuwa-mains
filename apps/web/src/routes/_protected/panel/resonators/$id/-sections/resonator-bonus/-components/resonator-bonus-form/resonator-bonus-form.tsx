import { useResonatorBonusForm } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-hooks";
import { SELECT_STAT_TYPE } from "@wuwa-mains/constants";
import { PencilIcon, PlusIcon } from "lucide-react";
import type { ResonatorBonusFormProps } from "@/routes/_protected/panel/resonators/-types";

export function ResonatorBonusForm(props: ResonatorBonusFormProps) {
  const {
    form,
    dialogOpen,
    formId,
    isEditing,
    isPending,
    onSubmit,
    setDialogOpen,
  } = useResonatorBonusForm(props);

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          isEditing={isEditing}
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>
                {isEditing ? "Editar bonus" : "Nuevo bonus"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar el bonus."
                  : "Rellena los campos para agregar un nuevo bonus."}
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
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar bonus"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
