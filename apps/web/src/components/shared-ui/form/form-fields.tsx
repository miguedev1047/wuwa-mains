import type { JSONContent } from "@tiptap/core";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import { useFieldContext, useFormContext } from "@/hooks/use-form";
import { useId } from "react";
import { TiptapEditor } from "@/components/shared-ui/editor";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { InputUrlImage } from "@/components/ui/input-url-image";
import { MultipleSelector } from "@/components/ui/multiselect";
import { type OptionZodSchema } from "@wuwa-mains/schemas/zod/option-schema";

interface TextFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  placeholder?: string;
  inputProps?: React.ComponentProps<typeof Input>;
}

export function TextField({
  description,
  label,
  showError = false,
  placeholder,
  inputProps,
}: TextFieldProps) {
  const id = useId();
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={`INPUT-${id}`}>{label}</FieldLabel>
      <Input
        {...inputProps}
        autoComplete="off"
        id={`INPUT-${id}`}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface UrlImageProps {
  label: string;
  description: string;
  showError?: boolean;
  placeholder?: string;
  inputProps?: React.ComponentProps<typeof InputUrlImage>;
}

export function UrlImageField({
  description,
  label,
  showError = false,
  placeholder,
  inputProps,
}: UrlImageProps) {
  const id = useId();
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={`INPUT-${id}`}>{label}</FieldLabel>
      <InputUrlImage
        {...inputProps}
        id={`INPUT-${id}`}
        placeholder={placeholder}
        value={field.state.value}
        onChange={field.handleChange}
      />
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface NumberFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  placeholder?: string;
  inputProps?: React.ComponentProps<typeof InputNumber>;
}

export function NumberField({
  description,
  label,
  showError = false,
  placeholder,
  inputProps,
}: NumberFieldProps) {
  const id = useId();
  const field = useFieldContext<number | string | null>();
  return (
    <Field>
      <FieldLabel htmlFor={`INPUT-${id}`}>{label}</FieldLabel>
      <InputNumber
        {...inputProps}
        id={`INPUT-${id}`}
        autoComplete="off"
        value={field.state.value as number}
        placeholder={placeholder}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
      />
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface SelectFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  placeholder?: string;
  items?: Array<{ value: string; label: string }>;
  selectProps?: React.ComponentProps<typeof Select>;
  selectTriggerProps?: React.ComponentProps<typeof SelectTrigger>;
  selectValueProps?: React.ComponentProps<typeof SelectValue>;
  selectContentProps?: React.ComponentProps<typeof SelectContent>;
  selectItemProps?: React.ComponentProps<typeof SelectItem>;
}

export function SelectField({
  description,
  label,
  showError = false,
  items = [],
  placeholder,
  selectProps,
  selectTriggerProps,
  selectValueProps,
  selectContentProps,
  selectItemProps,
}: SelectFieldProps) {
  const id = useId();
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={`INPUT-${id}`}>{label}</FieldLabel>
      <Select
        {...selectProps}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <SelectTrigger {...selectTriggerProps}>
          <SelectValue {...selectValueProps} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent {...selectContentProps}>
          {items.map((item) => (
            <SelectItem
              value={item.value}
              key={item.value}
              {...selectItemProps}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface MultiSelectFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  items?: OptionZodSchema[];
  placeholder?: string;
  notFound?: string;
  multiSelectProps?: React.ComponentProps<typeof MultipleSelector>;
}

export function MultiSelectField({
  description,
  label,
  showError = false,
  placeholder = "Selecciona un valor o varios",
  notFound = "Resultando no encontrado",
  items = [],
  multiSelectProps,
}: MultiSelectFieldProps) {
  const id = useId();
  const field = useFieldContext<OptionZodSchema[]>();
  return (
    <Field>
      <FieldLabel htmlFor={`MULTI-SELECT-${id}`}>{label}</FieldLabel>
      <MultipleSelector
        {...multiSelectProps}
        value={field.state.value}
        onChange={field.handleChange}
        defaultOptions={items}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-muted-foreground">
            {notFound}
          </p>
        }
      />
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface EditorFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  editorProps?: React.ComponentProps<typeof TiptapEditor>;
}

export function EditorField({
  label,
  description,
  showError,
  editorProps,
}: EditorFieldProps) {
  const id = useId();
  const field = useFieldContext<JSONContent>();
  return (
    <Field className="@[640px]/form:col-span-2">
      <FieldLabel htmlFor={`EDITOR-${id}`}>{label}</FieldLabel>
      <TiptapEditor
        {...editorProps}
        content={field.state.value}
        onChange={field.handleChange}
      />
      <FieldDescription>{description}</FieldDescription>
      {showError && (
        <FieldError>
          {!field.state.meta.isValid && (
            <p>{field.state.meta.errors[0].message}</p>
          )}
        </FieldError>
      )}
    </Field>
  );
}

interface SwitchFieldProps {
  label: string;
  description: string;
  showError?: boolean;
  switchProps?: React.ComponentProps<typeof Switch>;
}

export function SwitchField({
  label,
  description,
  switchProps,
  showError,
}: SwitchFieldProps) {
  const id = useId();
  const field = useFieldContext<boolean>();
  return (
    <Field orientation="horizontal" className="bg-accent p-4">
      <FieldContent>
        <FieldLabel htmlFor={`SWITCH-${id}`}>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
        {showError && (
          <FieldError>
            {!field.state.meta.isValid && (
              <p>{field.state.meta.errors[0].message}</p>
            )}
          </FieldError>
        )}
      </FieldContent>
      <Switch
        {...switchProps}
        id={`SWITCH-${id}`}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        onBlur={field.handleBlur}
      />
    </Field>
  );
}

export function ErrorField() {
  const field = useFieldContext<string>();
  return (
    <FieldError>
      {!field.state.meta.isValid && <p>{field.state.meta.errors[0].message}</p>}
    </FieldError>
  );
}

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  isPending?: boolean;
}

export function SubmitButton({
  children,
  isPending,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.canSubmit}>
      {(canSubmit) => (
        <Button type="submit" disabled={!canSubmit || isPending} {...props}>
          {isPending && (
            <>
              <Spinner /> Cargando...
            </>
          )}
          {!isPending && children}
        </Button>
      )}
    </form.Subscribe>
  );
}
