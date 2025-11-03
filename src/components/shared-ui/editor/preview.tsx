import "./editor.css";

import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import type { JSONContent } from "@tiptap/core";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { EditorPreviewSkeleton } from "@/components/state-ui/skeletons";

interface TiptapPreviewProps {
  content: JSONContent;
  className?: string;
}
const extensions = [TextStyleKit, StarterKit, Highlight];

export function TiptapPreview(props: TiptapPreviewProps) {
  const { content, className } = props;

  const editor = useEditor({
    extensions,
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(className, "w-full outline-none"),
      },
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
