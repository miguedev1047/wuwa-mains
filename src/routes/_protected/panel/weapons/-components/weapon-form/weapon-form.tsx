import { type WeaponFormProps } from "@panel/weapons/-types";

import {
  SELECT_WEAPON_MAIN_STATS,
  SELECT_WEAPON_TYPE,
  SELECT_STARS,
} from "@/data/constants";
import { useWeaponForm } from "@panel/weapons/-hooks/use-weapon-form";
import { PencilIcon, PlusIcon } from "lucide-react";

export function AddWeaponForm(props: WeaponFormProps) {
  const { form, formId, isEditing, onSubmit, isPending } = useWeaponForm(props);

  return (
    <form.AppForm>
      <form.FormCardHandle id={formId} onSubmit={onSubmit}>
        <form.FormCardRoot
          renderHeader={
            <form.FormCardHeader>
              <form.FormCardTitle>
                {isEditing ? "Editar arma" : " Nuevo arma"}
              </form.FormCardTitle>
              <form.FormCardDescription>
                {isEditing
                  ? "Actualiza los campos para editar el arma."
                  : "Rellena los campos para agregar un nuevo arma."}
              </form.FormCardDescription>
            </form.FormCardHeader>
          }
          renderContent={
            <form.FormCardContent>
              <h2 className="@[640px]/form:col-span-2 py-2 text-lg font-semibold">
                Información del arma
              </h2>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del arma"
                    description="Ingresa el nombre del arma."
                    placeholder="Espina de la Desafiadora"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del arma"
                    description="Ingresa el avatar del arma"
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del arma"
                    description="Ingresa la descripcion del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="passive">
                {(field) => (
                  <field.EditorField
                    label="Pasiva del arma"
                    description="Ingresa la pasiva del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="weapon_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de arma"
                    placeholder="Selecciona un arma"
                    description="Ingresa el tipo de arma del arma."
                    items={SELECT_WEAPON_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del arma"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del arma."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
              <div className="grid @[640px]/form:grid-cols-2 @[640px]/form:col-span-2 gap-4">
                <form.AppField name="is_new">
                  {(field) => (
                    <field.SwitchField
                      label="Nuevo arma (Descativar/Activar)"
                      description="Activa esta opción para descatar al arma como nuevo."
                      showError
                    />
                  )}
                </form.AppField>
                <form.AppField name="is_visible">
                  {(field) => (
                    <field.SwitchField
                      label="Arma visible (Descativar/Activar)"
                      description="Activa esta opción para hacer visibles a este arma para todos."
                      showError
                    />
                  )}
                </form.AppField>
              </div>
              <h2 className="@[640px]/form:col-span-2 py-2 text-lg font-semibold">
                Estadísticas del arma
              </h2>
              <form.AppField name="main_stat">
                {(field) => (
                  <field.SelectField
                    label="Estadística principal"
                    description="Selecciona la estadística principal del arma."
                    items={SELECT_WEAPON_MAIN_STATS}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="atq">
                {(field) => (
                  <field.NumberField
                    label="Ataque del arma"
                    description="Ingresa el ataque del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="main_stat_value">
                {(field) => (
                  <field.NumberField
                    label="Valor de la estadística principal"
                    description="Ingresa el valor de la estadística principal del arma."
                    inputProps={{ percentIcon: true }}
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
                  {isEditing ? "Guardar cambios" : "Agregar arma"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormCardFooter>
          }
        />
      </form.FormCardHandle>
    </form.AppForm>
  );
}

export function EditWeaponForm(props: WeaponFormProps) {
  const {
    form,
    formId,
    isEditing,
    onSubmit,
    dialogOpen,
    setDialogOpen,
    isPending,
  } = useWeaponForm(props);

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
                {isEditing ? "Editar arma" : " Nuevo arma"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar el arma."
                  : "Rellena los campos para agregar un nuevo arma."}
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <h2 className="@[640px]/form:col-span-2 py-2 text-lg font-semibold">
                Información del arma
              </h2>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del arma"
                    description="Ingresa el nombre del arma."
                    placeholder="Espina de la Desafiadora"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del arma"
                    description="Ingresa el avatar del arma."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del arma"
                    description="Ingresa la descripcion del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="passive">
                {(field) => (
                  <field.EditorField
                    label="Pasiva del arma"
                    description="Ingresa la pasiva del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="weapon_type">
                {(field) => (
                  <field.SelectField
                    label="Tipo de arma"
                    placeholder="Selecciona un arma"
                    description="Ingresa el tipo de arma del arma."
                    items={SELECT_WEAPON_TYPE}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="stars">
                {(field) => (
                  <field.SelectField
                    label="Estrellas del arma"
                    placeholder="Selecciona las estrellas"
                    description="Ingresa las estrellas del arma."
                    items={SELECT_STARS}
                    showError
                  />
                )}
              </form.AppField>
              <div className="grid @[640px]/form:grid-cols-2 @[640px]/form:col-span-2 gap-4">
                <form.AppField name="is_new">
                  {(field) => (
                    <field.SwitchField
                      label="Nuevo arma (Descativar/Activar)"
                      description="Activa esta opción para descatar al arma como nuevo."
                      showError
                    />
                  )}
                </form.AppField>
                <form.AppField name="is_visible">
                  {(field) => (
                    <field.SwitchField
                      label="Arma visible (Descativar/Activar)"
                      description="Activa esta opción para hacer visibles a este arma para todos."
                      showError
                    />
                  )}
                </form.AppField>
              </div>
              <h2 className="@[640px]/form:col-span-2 py-2 text-lg font-semibold">
                Estadísticas del arma
              </h2>
              <form.AppField name="main_stat">
                {(field) => (
                  <field.SelectField
                    label="Estadística principal"
                    description="Selecciona la estadística principal del arma."
                    items={SELECT_WEAPON_MAIN_STATS}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="atq">
                {(field) => (
                  <field.NumberField
                    label="Ataque del arma"
                    description="Ingresa el ataque del arma."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="main_stat_value">
                {(field) => (
                  <field.NumberField
                    label="Valor de la estadística principal"
                    description="Ingresa el valor de la estadística principal del arma."
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
                <form.SubmitButton isPending={isPending} form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar arma"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
