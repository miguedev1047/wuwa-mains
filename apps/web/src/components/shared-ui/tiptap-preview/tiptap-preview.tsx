import { EditorProvider } from "@/components/kibo-ui/editor";
import { cn } from "@/lib/utils";
import { type JSONContent } from "@tiptap/core";

interface TiptapPreviewProps {
  content: JSONContent;
  className?: string;
}

export function TiptapPreview(props: TiptapPreviewProps) {
  const { content, className } = props;

  return (
    <EditorProvider
      className={cn("w-full rounded-lg", className)}
      editable={false}
      content={content}
    />
  );
}
