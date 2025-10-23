import type { Editor, JSONContent } from '@/components/kibo-ui/editor'

import {
  EditorBubbleMenu,
  EditorClearFormatting,
  EditorFloatingMenu,
  EditorFormatBold,
  EditorFormatItalic,
  EditorFormatStrike,
  EditorFormatUnderline,
  EditorLinkSelector,
  EditorNodeBulletList,
  EditorNodeOrderedList,
  EditorNodeQuote,
  EditorNodeTable,
  EditorNodeTaskList,
  EditorNodeText,
  EditorProvider,
  EditorSelector,
  EditorTableColumnAfter,
  EditorTableColumnBefore,
  EditorTableColumnDelete,
  EditorTableColumnMenu,
  EditorTableDelete,
  EditorTableFix,
  EditorTableGlobalMenu,
  EditorTableHeaderColumnToggle,
  EditorTableHeaderRowToggle,
  EditorTableMenu,
  EditorTableMergeCells,
  EditorTableRowAfter,
  EditorTableRowBefore,
  EditorTableRowDelete,
  EditorTableRowMenu,
  EditorTableSplitCell,
} from '@/components/kibo-ui/editor'
import { cn } from '@/lib/utils'

const DEFAULT_VALUE: JSONContent = { type: 'doc', content: [{}] }

interface TiptapEditorProps {
  content?: JSONContent
  onChange?: (content: JSONContent) => void
  placeholder?: string
  className?: string
}

export function TiptapEditor(props: TiptapEditorProps) {
  const {
    content = DEFAULT_VALUE,
    placeholder = 'Empieza a escribir...',
    className,
    onChange,
  } = props

  const handleUpdate = ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON()
    onChange?.(json)
  }

  return (
    <EditorProvider
      className={cn(
        'min-h-[175px] w-full overflow-y-auto rounded-lg border bg-background p-4',
        className
      )}
      content={content}
      onUpdate={handleUpdate}
      placeholder={placeholder}
    >
      <EditorFloatingMenu>
        <EditorNodeBulletList hideName />
        <EditorNodeQuote hideName />
        <EditorNodeTable hideName />
      </EditorFloatingMenu>
      <EditorBubbleMenu>
        <EditorSelector title='Texto'>
          <EditorNodeText />
          <EditorNodeBulletList />
          <EditorNodeOrderedList />
          <EditorNodeTaskList />
          <EditorNodeQuote />
        </EditorSelector>
        <EditorSelector title='Formato'>
          <EditorFormatBold />
          <EditorFormatItalic />
          <EditorFormatUnderline />
          <EditorFormatStrike />
        </EditorSelector>
        <EditorLinkSelector />
        <EditorClearFormatting />
      </EditorBubbleMenu>
      <EditorTableMenu>
        <EditorTableColumnMenu>
          <EditorTableColumnBefore />
          <EditorTableColumnAfter />
          <EditorTableColumnDelete />
        </EditorTableColumnMenu>
        <EditorTableRowMenu>
          <EditorTableRowBefore />
          <EditorTableRowAfter />
          <EditorTableRowDelete />
        </EditorTableRowMenu>
        <EditorTableGlobalMenu>
          <EditorTableHeaderColumnToggle />
          <EditorTableHeaderRowToggle />
          <EditorTableDelete />
          <EditorTableMergeCells />
          <EditorTableSplitCell />
          <EditorTableFix />
        </EditorTableGlobalMenu>
      </EditorTableMenu>
    </EditorProvider>
  )
}
