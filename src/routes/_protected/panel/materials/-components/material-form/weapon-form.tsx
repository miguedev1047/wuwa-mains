import { SELECT_MATERIAL_TYPE, SELECT_STARS } from "@/data/constants";
import { type MaterialFormProps } from "@panel/materials/-types";
import { useMaterialForm } from "@panel/materials/-hooks/use-material-form";
import { PencilIcon, PlusIcon } from "lucide-react";

export function AddMaterialForm(props: MaterialFormProps) {
  const { form, formId, isEditing, onSubmit, isPending } =
    useMaterialForm(props);

  return (
    <form.AppForm>
      <form.FormCardHandle id={formId} onSubmit={onSubmit}>
        <form.FormCardRoot
          renderHeader={
            <form.FormCardHeader>
              <form.FormCardTitle>
                {isEditing ? "Editar material" : "Nuevo material"}
              </form.FormCardTitle>
              <form.FormCardDescription>
                {isEditing
                  ? "Actualiza los campos para editar el material."
                  : "Rellena los campos para agregar un nuevo material."}
              </form.FormCardDescription>
            </form.FormCardHeader>
          }
          renderContent={
            <form.FormCardContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del material"
                    description="Ingresa el nombre del material."
                    placeholder="Núcleo Tácito de la Abominación en grupo"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del material"
                    description="Ingresa el avatar del material"
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del material"
                    description="Ingresa la descripcion del material."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="material_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de material"
                    placeholder="Selecciona un material"
                    description="Ingresa el tipo de material del material."
                    items={SELECT_MATERIAL_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del material"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del material."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
            </form.FormCardContent>
          }
          renderFooter={
            <form.FormCardFooter>
              <form.AppForm>
                <form.SubmitButton isPending={isPending} form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar material"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormCardFooter>
          }
        />
      </form.FormCardHandle>
    </form.AppForm>
  );
}

export function EditMaterialForm(props: MaterialFormProps) {
  const {
    form,
    formId,
    isEditing,
    onSubmit,
    dialogOpen,
    setDialogOpen,
    isPending,
  } = useMaterialForm(props);

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
                {isEditing ? "Editar material" : "Nuevo material"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar el material."
                  : "Rellena los campos para agregar un nuevo material."}
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del material"
                    description="Ingresa el nombre del material."
                    placeholder="Núcleo Tácito de la Abominación en grupo"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del material"
                    description="Ingresa el avatar del material"
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del material"
                    description="Ingresa la descripcion del material."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="material_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de material"
                    placeholder="Selecciona un material"
                    description="Ingresa el tipo de material del material."
                    items={SELECT_MATERIAL_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del material"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del material."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
            </form.FormSheetContent>
          }
          renderFooter={
            <form.FormSheetFooter>
              <form.AppForm>
                <form.SubmitButton isPending={isPending} form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar material"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
