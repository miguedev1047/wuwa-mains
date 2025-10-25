import {
  SELECT_COMBAT_STYLES,
  SELECT_ELEMENT_TYPE,
  SELECT_STARS,
  SELECT_WEAPON_TYPE,
} from "@wuwa-mains/constants";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useResonatorForm } from "@/routes/_protected/panel/resonators/-hooks";
import { type ResonatorFormProps } from "@/routes/_protected/panel/resonators/-types";

export function AddResonatorForm(props: ResonatorFormProps) {
  const { form, formId, isEditing, onSubmit, isPending } =
    useResonatorForm(props);

  return (
    <form.AppForm>
      <form.FormCardHandle id={formId} onSubmit={onSubmit}>
        <form.FormCardRoot
          renderHeader={
            <form.FormCardHeader>
              <form.FormCardTitle>
                {isEditing ? "Editar resonador" : " Nuevo resonador"}
              </form.FormCardTitle>
              <form.FormCardDescription>
                {isEditing
                  ? "Actualiza los campos para editar el resonador."
                  : "Rellena los campos para agregar a un resonador nuevo."}
              </form.FormCardDescription>
            </form.FormCardHeader>
          }
          renderContent={
            <form.FormCardContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del resonador"
                    description="Ingresa el nombre del resonador."
                    placeholder="Cartethyia"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="title">
                {(field) => (
                  <field.TextField
                    label="Titulo del resonador"
                    description="Ingresa el titulo del resonador."
                    placeholder="Tempestad devastadora"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del resonador"
                    description="Ingresa el avatar del resonador."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="splash_image">
                {(field) => (
                  <field.UrlImageField
                    label="Splash art del resonador"
                    description="Ingresa el splash art del resonador."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del resonador"
                    description="Ingresa la descripcion del resonador."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="element_type">
                {(field) => (
                  <field.SelectField
                    label="Elemento del resonador"
                    placeholder="Selecciona un elemento"
                    description="Ingresa el elemento del resonador."
                    items={SELECT_ELEMENT_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="weapon_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de resonador"
                    placeholder="Selecciona un arma"
                    description="Ingresa el tipo de arma del resonador."
                    items={SELECT_WEAPON_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del resonador"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del resonador."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="combat_styles">
                {(field) => (
                  <field.MultiSelectField
                    label="Estilos de combate"
                    description="Ingresa los estilos de combate del resonador."
                    placeholder="Selecciona un estilo de combate"
                    notFound="No se han encontrado estilos de combate."
                    items={SELECT_COMBAT_STYLES}
                    showError
                  />
                )}
              </form.AppField>
              <div className="grid @[640px]/form:grid-cols-2 @[640px]/form:col-span-2 gap-4">
                <form.AppField name="is_new">
                  {(field) => (
                    <field.SwitchField
                      label="Nuevo resonador (Descativar/Activar)"
                      description="Activa esta opción para descatar al resonador como nuevo."
                      showError
                    />
                  )}
                </form.AppField>
                <form.AppField name="is_visible">
                  {(field) => (
                    <field.SwitchField
                      label="Resnador visible (Descativar/Activar)"
                      description="Activa esta opción para hacer visibles a este resonador para todos."
                      showError
                    />
                  )}
                </form.AppField>
              </div>
            </form.FormCardContent>
          }
          renderFooter={
            <form.FormCardFooter>
              <form.AppForm>
                <form.SubmitButton isPending={isPending} form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar resonador"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormCardFooter>
          }
        />
      </form.FormCardHandle>
    </form.AppForm>
  );
}

export function EditResonatorForm(props: ResonatorFormProps) {
  const {
    form,
    formId,
    isEditing,
    onSubmit,
    dialogOpen,
    setDialogOpen,
    isPending,
  } = useResonatorForm(props);

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
                {isEditing ? "Editar resonador" : " Nuevo resonador"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar el resonador."
                  : "Rellena los campos para agregar a un resonador nuevo."}
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del resonador"
                    description="Ingresa el nombre del resonador."
                    placeholder="Cartethyia"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="title">
                {(field) => (
                  <field.TextField
                    label="Titulo del resonador"
                    description="Ingresa el titulo del resonador."
                    placeholder="Tempestad devastadora"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del resonador"
                    description="Ingresa el avatar del resonador."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="splash_image">
                {(field) => (
                  <field.UrlImageField
                    label="Splash art del resonador"
                    description="Ingresa el splash art del resonador."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del resonador"
                    description="Ingresa la descripcion del resonador."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="element_type">
                {(field) => (
                  <field.SelectField
                    label="Elemento del resonador"
                    placeholder="Selecciona un elemento"
                    description="Ingresa el elemento del resonador."
                    items={SELECT_ELEMENT_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="weapon_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de resonador"
                    placeholder="Selecciona un arma"
                    description="Ingresa el tipo de arma del resonador."
                    items={SELECT_WEAPON_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del resonador"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del resonador."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="combat_styles">
                {(field) => (
                  <field.MultiSelectField
                    label="Estilos de combate"
                    description="Ingresa los estilos de combate del resonador."
                    placeholder="Selecciona un estilo de combate"
                    notFound="No se han encontrado estilos de combate."
                    items={SELECT_COMBAT_STYLES}
                    showError
                  />
                )}
              </form.AppField>
              <div className="grid @[640px]/form:grid-cols-2 @[640px]/form:col-span-2 gap-4">
                <form.AppField name="is_new">
                  {(field) => (
                    <field.SwitchField
                      label="Nuevo resonador (Descativar/Activar)"
                      description="Activa esta opción para descatar al resonador como nuevo."
                      showError
                    />
                  )}
                </form.AppField>
                <form.AppField name="is_visible">
                  {(field) => (
                    <field.SwitchField
                      label="Resnador visible (Descativar/Activar)"
                      description="Activa esta opción para hacer visibles a este resonador para todos."
                      showError
                    />
                  )}
                </form.AppField>
              </div>
            </form.FormSheetContent>
          }
          renderFooter={
            <form.FormSheetFooter>
              <form.AppForm>
                <form.SubmitButton isPending={isPending} form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar resonador"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
