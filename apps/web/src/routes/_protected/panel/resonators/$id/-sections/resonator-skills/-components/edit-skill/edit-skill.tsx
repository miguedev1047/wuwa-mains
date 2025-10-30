import type { ResonatorSkillZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { useEditSkill } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-hooks";
import { PencilIcon } from "lucide-react";
import { SELECT_RESONATOR_SKILL_TYPE } from "@wuwa-mains/constants";

export function EditSkill(data: ResonatorSkillZodSchema) {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useEditSkill(data);

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          isEditing
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>Editar habilidad</form.FormSheetTitle>
              <form.FormSheetDescription>
                Actualiza los campos para editar la habilidad.
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
