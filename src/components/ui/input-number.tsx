"use client";

import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { PercentIcon } from "lucide-react";

interface InputNumberProps
  extends Omit<React.ComponentProps<"input">, "type" | "onChange"> {
  value?: number | string;
  onChange?: (value: number | null) => void;
  decimalPlaces?: number;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  percentIcon?: boolean;
}

function InputNumber({
  className,
  value = "",
  onChange,
  decimalPlaces = 2,
  min,
  max,
  ref,
  allowNegative = true,
  percentIcon = false,
  ...props
}: InputNumberProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(() => {
    if (value === "" || value === null || value === undefined) return "";
    return typeof value === "number" ? value.toString() : value;
  });

  // Update display value when prop value changes
  React.useEffect(() => {
    if (value === "" || value === null || value === undefined) {
      setDisplayValue("");
    } else {
      setDisplayValue(typeof value === "number" ? value.toString() : value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Allow empty input
    if (inputValue === "") {
      setDisplayValue("");
      onChange?.(null);
      return;
    }

    // Handle negative sign
    if (!allowNegative && inputValue.startsWith("-")) {
      return;
    }

    // Allow only numbers, decimal point, and negative sign
    const regex = allowNegative
      ? /^-?(\d+\.?\d*|\.\d*)$/
      : /^(\d+\.?\d*|\.\d*)$/;

    if (!regex.test(inputValue)) {
      return;
    }

    // Prevent multiple decimal points
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return;
    }

    // Limit decimal places
    const decimalIndex = inputValue.indexOf(".");
    if (
      decimalIndex !== -1 &&
      inputValue.length - decimalIndex - 1 > decimalPlaces
    ) {
      inputValue = inputValue.slice(0, decimalIndex + decimalPlaces + 1);
    }

    setDisplayValue(inputValue);

    // Convert to number and validate range
    const numericValue = Number.parseFloat(inputValue);

    if (!isNaN(numericValue)) {
      // Check min/max constraints
      if (min !== undefined && numericValue < min) {
        return;
      }
      if (max !== undefined && numericValue > max) {
        return;
      }

      onChange?.(numericValue);
    } else if (inputValue === "-" || inputValue === ".") {
      // Allow intermediate states while typing
      onChange?.(null);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let finalValue = displayValue;

    // Clean up trailing decimal point or negative sign
    if (finalValue === "-" || finalValue === "." || finalValue === "-.") {
      finalValue = "";
      setDisplayValue("");
      onChange?.(null);
    } else if (finalValue.endsWith(".")) {
      finalValue = finalValue.slice(0, -1);
      setDisplayValue(finalValue);
      if (finalValue) {
        onChange?.(Number.parseFloat(finalValue));
      }
    }

    props.onBlur?.(e);
  };

  return (
    <InputGroup>
      <InputGroupInput
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={cn(className)}
        {...props}
      />
      {percentIcon && (
        <InputGroupAddon align="inline-end">
          <PercentIcon />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

export { InputNumber };
