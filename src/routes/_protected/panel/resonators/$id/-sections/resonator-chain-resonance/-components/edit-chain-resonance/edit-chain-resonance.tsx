import type { ChainResonanceZodSchema } from "@/schemas/zod/resonator-schema";
import { useEditChainResonance } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-chain-resonance/-hooks";
import { PencilIcon } from "lucide-react";

export function EditChainResonance(data: ChainResonanceZodSchema) {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useEditChainResonance(data);

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          isEditing
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>
                Editar la cadena de resonancia
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                Actualiza los campos para editar la cadena de resonancia.
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
                    placeholder="Corona otorgada por el destino"
                    showError
                  />
                )}
              </form.AppField>
              <form.AppField name="chain_resonance_image">
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
                  Agregar habilidad
                </form.SubmitButton>
              </form.AppForm>
            </form.FormSheetFooter>
          }
        />
      </form.FormSheetHandle>
    </form.AppForm>
  );
}
