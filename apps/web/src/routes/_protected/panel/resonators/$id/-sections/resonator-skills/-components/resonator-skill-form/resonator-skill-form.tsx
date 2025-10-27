import { SELECT_RESONATOR_SKILL_TYPE } from "@wuwa-mains/constants";
import { useResonatorSkillForm } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-hooks";
import { PencilIcon, PlusIcon } from "lucide-react";
import type { ResonatorSkillFormProps } from "@/routes/_protected/panel/resonators/-types";

export function ResonatorSkillForm(props: ResonatorSkillFormProps) {
  const {
    form,
    formId,
    isEditing,
    onSubmit,
    dialogOpen,
    setDialogOpen,
    isPending,
  } = useResonatorSkillForm(props);

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
                {isEditing ? "Editar habilidad" : "Nueva habilidad"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar la habilidad."
                  : "Rellena los campos para agregar una nueva habilidad."}
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre de la habilidad"
                    description="Ingresa el nombre de la habilidad."
                    placeholder="Espada que esculpe mi esencia"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="skill_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de habilidad"
                    description="Ingresa el tipo de habilidad."
                    placeholder="Selecciona un tipo de habilidad"
                    items={SELECT_RESONATOR_SKILL_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="skill_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar de la habilidad"
                    description="Ingresa el avatar de la habilidad."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion de la habilidad"
                    description="Ingresa la descripcion de la habilidad."
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
                  {isEditing ? "Guardar cambios" : "Agregar habilidad"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
