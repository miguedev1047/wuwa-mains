import { PlusIcon } from "lucide-react";
import { useAddChainResonance } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-chain-resonance/-hooks";

export function AddChainResonance() {
  const { dialogOpen, form, formId, isPending, onSubmit, setDialogOpen } =
    useAddChainResonance();

  return (
    <form.AppForm>
      <form.FormSheetHandle id={formId} onSubmit={onSubmit}>
        <form.FormSheetRoot
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          renderHeader={
            <form.FormSheetHeader>
              <form.FormSheetTitle>
                Nueva cadena de resonancia
              </form.FormSheetTitle>
              <form.FormSheetDescription>
                Rellena los campos para agregar una nueva habilidad.
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
                  <PlusIcon />
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
