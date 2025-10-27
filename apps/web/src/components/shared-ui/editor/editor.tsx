import "./editor.css";

import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import { Editor, type JSONContent } from "@tiptap/react";

import {
  BoldIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BubbleMenu } from "@tiptap/react/menus";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { Placeholder } from "@tiptap/extensions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_VALUE: JSONContent = { type: "doc", content: [{}] };

interface TiptapEditorProps {
  content?: JSONContent;
  onChange?: (content: JSONContent) => void;
  placeholder?: string;
  className?: string;
}

type EditorProps = { editor: Editor };

function TextNodes({ editor }: EditorProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      };
    },
  });

  const TEXT_NODES = [
    {
      label: "Parrafo",
      value: "paragraph",
      icon: TextIcon,
      command: () => editor.chain().focus().setParagraph().run(),
      isActive: editorState.isParagraph,
    },
    {
      label: "Encabezado 1",
      value: "heading1",
      icon: Heading1Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editorState.isHeading1,
    },
    {
      label: "Encabezado 2",
      value: "heading2",
      icon: Heading2Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editorState.isHeading2,
    },
    {
      label: "Encabezado 3",
      value: "heading3",
      icon: Heading3Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editorState.isHeading3,
    },
    {
      label: "Lista de viñetas",
      value: "bulletList",
      icon: ListIcon,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editorState.isBulletList,
    },
    {
      label: "Lista ordenada",
      value: "orderedList",
      icon: ListOrderedIcon,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editorState.isOrderedList,
    },
    {
      label: "Código",
      value: "codeBlock",
      icon: CodeIcon,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editorState.isCodeBlock,
    },
    {
      label: "Cita",
      value: "blockquote",
      icon: QuoteIcon,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editorState.isBlockquote,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" size="sm" variant="ghost">
          <span className="whitespace-nowrap text-xs">Texto</span>
          <ChevronDownIcon size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-64 p-1")} sideOffset={5}>
        {TEXT_NODES.map((option) => (
          <Button
            type="button"
            className={`flex gap-4 w-full`}
            onClick={() => option.command()}
            size="sm"
            variant="ghost"
          >
            {option.icon && <option.icon className="shrink-0" size={16} />}
            <span className="flex-1 text-left">{option.label}</span>
            {option.isActive ? (
              <CheckIcon className="shrink-0 text-muted-foreground" size={12} />
            ) : null}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function TextFormat({ editor }: EditorProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
      };
    },
  });

  const TEXT_FORMAT = [
    {
      label: "Negrita",
      value: "bold",
      icon: BoldIcon,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editorState.isBold,
    },
    {
      label: "Cursiva",
      value: "italic",
      icon: ItalicIcon,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editorState.isItalic,
    },
    {
      label: "Tachado",
      value: "strike",
      icon: StrikethroughIcon,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: editorState.isStrike,
    },
    {
      label: "Subrayado",
      value: "underline",
      icon: UnderlineIcon,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editorState.isUnderline,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" size="sm" variant="ghost">
          <span className="whitespace-nowrap text-xs">Formato</span>
          <ChevronDownIcon size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-48 p-1")} sideOffset={5}>
        {TEXT_FORMAT.map((option) => (
          <Button
            type="button"
            className={`flex gap-4 w-full`}
            onClick={() => option.command()}
            size="sm"
            variant="ghost"
          >
            {option.icon && <option.icon className="shrink-0" size={16} />}
            <span className="flex-1 text-left">{option.label}</span>
            {option.isActive && (
              <CheckIcon className="shrink-0 text-muted-foreground" size={12} />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function ClearNodes({ editor }: EditorProps) {
  const removeFormating = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  return (
    <Button type="button" onClick={removeFormating} variant="ghost" size="icon">
      <RemoveFormattingIcon />
    </Button>
  );
}

function Highlighter({ editor }: EditorProps) {
  const highlight = () => {
    editor.chain().focus().toggleHighlight().run();
  };

  return (
    <Button type="button" onClick={highlight} variant="ghost" size="icon">
      <HighlighterIcon />
    </Button>
  );
}

function MenuBar({ editor }: EditorProps) {
  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: "bottom", offset: 8, flip: true }}
    >
      <div className="flex items-center gap-1 rounded-(--radius) bg-popover p-1">
        <TextFormat editor={editor} />
        <TextNodes editor={editor} />
        <ClearNodes editor={editor} />
        <Highlighter editor={editor} />
      </div>
    </BubbleMenu>
  );
}

export function TiptapEditor(props: TiptapEditorProps) {
  const {
    content = DEFAULT_VALUE,
    placeholder = "Empieza a escribir...",
    className,
    onChange,
  } = props;

  const handleUpdate = ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();
    onChange?.(json);
  };

  const extensions = [
    TextStyleKit,
    StarterKit,
    Highlight,
    Placeholder.configure({
      placeholder,
      emptyEditorClass:
        "before:text-muted-foreground before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none",
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: cn(className, "w-full min-h-[200px] size-full outline-none"),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return <Skeleton className="w-full rounded-(--radius) h-[200px]" />;
  }

  return (
    <div className="p-4 rounded-(--radius) border-input bg-input/30 shadow-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
