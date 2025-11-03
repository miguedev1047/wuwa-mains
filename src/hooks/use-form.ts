import {
  TextField,
  UrlImageField,
  EditorField,
  ErrorField,
  MultiSelectField,
  NumberField,
  SelectField,
  SwitchField,
  SubmitButton,
} from "@/components/shared-ui/form/form-fields";
import {
  FormSheetRoot,
  FormSheetHeader,
  FormSheetTitle,
  FormSheetContent,
  FormSheetDescription,
  FormSheetFooter,
  FormSheetTrigger,
  FormSheetHandle,
} from "@/components/shared-ui/form/form-sheet";
import {
  FormCardRoot,
  FormCardHeader,
  FormCardTitle,
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHandle,
} from "@/components/shared-ui/form/form-card";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    UrlImageField,
    EditorField,
    ErrorField,
    MultiSelectField,
    NumberField,
    SelectField,
    SwitchField,
  },
  formComponents: {
    FormCardRoot,
    FormCardContent,
    FormCardDescription,
    FormCardFooter,
    FormCardHandle,
    FormCardHeader,
    FormCardTitle,
    FormSheetRoot,
    FormSheetHeader,
    FormSheetTitle,
    FormSheetContent,
    FormSheetDescription,
    FormSheetFooter,
    FormSheetTrigger,
    FormSheetHandle,
    SubmitButton,
  },
  fieldContext,
  formContext,
});
