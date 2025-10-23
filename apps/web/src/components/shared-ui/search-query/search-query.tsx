import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { InputSkeleton } from "@/components/state-ui/skeletons";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

interface SearchQueryProps
  extends React.ComponentProps<typeof InputGroupInput> {
  queryParam: string;
}

const DEBOUNCE_TIME = 500;

export function SearchQuery({ ...props }: SearchQueryProps) {
  return (
    <Suspense
      fallback={<InputSkeleton className="@[720px]/header:col-span-3" />}
    >
      <SearchQueryComponent {...props} />
    </Suspense>
  );
}

export function SearchQueryComponent({
  placeholder,
  className,
  queryParam,
  ...props
}: SearchQueryProps) {
  const [param, setParam] = useQueryState(queryParam, {
    defaultValue: "",
  });

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const value = e.target.value;
      if (value) {
        setParam(value);
      } else {
        setParam(null);
      }
    },
    DEBOUNCE_TIME,
  );

  return (
    <InputGroup className={cn("w-full", className)}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        defaultValue={param}
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </InputGroup>
  );
}
