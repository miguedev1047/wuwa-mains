import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputSkeleton } from "@/components/state-ui/skeletons";
import { type OptionZodSchema } from "@wuwa-mains/schemas/zod/option-schema";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

interface SelectQueryProps extends React.ComponentProps<typeof Select> {
  items: OptionZodSchema[];
  queryParam: string;
  placeholder?: string;
  className?: string;
}

const DEBOUNCE_TIME = 500;

export function SelectQuery({ ...props }: SelectQueryProps) {
  return (
    <Suspense fallback={<InputSkeleton />}>
      <SelectQueryComponent {...props} />
    </Suspense>
  );
}

export function SelectQueryComponent({
  items = [],
  queryParam,
  placeholder,
  className,
}: SelectQueryProps) {
  const [param, setParam] = useQueryState(queryParam, {
    defaultValue: "none",
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value === "none") {
      setParam(null);
    } else {
      setParam(value);
    }
  }, DEBOUNCE_TIME);

  return (
    <Select defaultValue={param} onValueChange={handleSearch}>
      <SelectTrigger
        aria-label={`${param}-select-input`}
        className={cn("flex-1 w-full", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
