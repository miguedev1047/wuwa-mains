import {
  SELECT_ECHO_CLASS,
  SELECT_ECHO_COST,
  SELECT_ECHO_SET,
} from "@wuwa-mains/constants";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useEchoForm } from "@/routes/_protected/panel/echoes/-hooks";
import { type EchoesFormProps } from "@/routes/_protected/panel/echoes/-types";

export function AddEchoForm(props: EchoesFormProps) {
  const { form, formId, isEditing, onSubmit } = useEchoForm(props);

  return (
    <form.AppForm>
      <form.FormCardHandle id={formId} onSubmit={onSubmit}>
        <form.FormCardRoot
          renderHeader={
            <form.FormCardHeader>
              <form.FormCardTitle>
                {isEditing ? "Editar eco" : " Nuevo eco"}
              </form.FormCardTitle>
              <form.FormCardDescription>
                {isEditing
                  ? "Actualiza los campos para editar el eco."
                  : "Rellena los campos para agregar un nuevo eco."}
              </form.FormCardDescription>
            </form.FormCardHeader>
          }
          renderContent={
            <form.FormCardContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del eco"
                    description="Ingresa el nombre del eco."
                    placeholder="Mephis Tempestad"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="sets">
                {(field) => (
                  <field.MultiSelectField
                    label="Sets del eco"
                    description="Ingresa los sets del eco."
                    placeholder="Selecciona un set de eco"
                    notFound="No se han encontrado sets de eco."
                    items={SELECT_ECHO_SET}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del eco"
                    description="Ingresa el avatar del eco."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="skill_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar de la habilidad del eco"
                    description="Ingresa el avatar de la habilidad del eco."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del eco"
                    description="Ingresa la descripcion del eco."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="cost">
                {(field) => (
                  <field.SelectField
                    label="Costo del eco"
                    placeholder="Selecciona el coste"
                    description="Ingresa el costo del eco."
                    items={SELECT_ECHO_COST}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="class">
                {(field) => (
                  <field.SelectField
                    label="Clase del eco"
                    placeholder="Selecciona una clase"
                    description="Ingresa la clase del eco."
                    items={SELECT_ECHO_CLASS}
                    showError
                  />
                )}
              </form.AppField>
            </form.FormCardContent>
          }
          renderFooter={
            <form.FormCardFooter>
              <form.AppForm>
                <form.SubmitButton form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar eco"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormCardFooter>
          }
        />
      </form.FormCardHandle>
    </form.AppForm>
  );
}

export function EditEchoForm(props: EchoesFormProps) {
  const { form, formId, isEditing, onSubmit, dialogOpen, setDialogOpen } =
    useEchoForm(props);

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
                {isEditing ? "Editar eco" : "Nuevo eco"}
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                {isEditing
                  ? "Actualiza los campos para editar el eco."
                  : "Rellena los campos para agregar un nuevo eco."}
              </form.FormSheetDescription>
            </form.FormSheetHeader>
          }
          renderContent={
            <form.FormSheetContent>
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Nombre del eco"
                    description="Ingresa el nombre del eco."
                    placeholder="Mephis Tempestad"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="sets">
                {(field) => (
                  <field.MultiSelectField
                    label="Sets del eco"
                    description="Ingresa los sets del eco."
                    placeholder="Selecciona un set de eco"
                    notFound="No se han encontrado sets de eco."
                    items={SELECT_ECHO_SET}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="avatar_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar del eco"
                    description="Ingresa el avatar del eco."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="skill_image">
                {(field) => (
                  <field.UrlImageField
                    label="Avatar de la habilidad del eco"
                    description="Ingresa el avatar de la habilidad del eco."
                    placeholder="https://image.cdn.com/image.png"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.EditorField
                    label="Descripcion del eco"
                    description="Ingresa la descripcion del eco."
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="cost">
                {(field) => (
                  <field.SelectField
                    label="Costo del eco"
                    placeholder="Selecciona el coste"
                    description="Ingresa el costo del eco."
                    items={SELECT_ECHO_COST}
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="class">
                {(field) => (
                  <field.SelectField
                    label="Clase del eco"
                    placeholder="Selecciona una clase"
                    description="Ingresa la clase del eco."
                    items={SELECT_ECHO_CLASS}
                    showError
                  />
                )}
              </form.AppField>
            </form.FormSheetContent>
          }
          renderFooter={
            <form.FormSheetFooter>
              <form.AppForm>
                <form.SubmitButton form={formId}>
                  {isEditing ? <PencilIcon /> : <PlusIcon />}
                  {isEditing ? "Guardar cambios" : "Agregar eco"}
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
