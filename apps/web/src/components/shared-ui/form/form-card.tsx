import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { createContext, use } from 'react'

interface FormCardRootProps {
  renderHeader?: React.ReactNode
  renderContent?: React.ReactNode
  renderFooter?: React.ReactNode
}

const FormCardContext = createContext<FormCardRootProps | null>(null)

function useFormCard() {
  const CONTEXT = use(FormCardContext)
  if (!CONTEXT) throw new Error('useFormCard must wrapped in FormCardContext')
  return CONTEXT
}

export function FormCardRoot({ ...props }: FormCardRootProps) {
  return (
    <FormCardContext.Provider value={{ ...props }}>
      <FormCard />
    </FormCardContext.Provider>
  )
}

export function FormCard() {
  const { ...data } = useFormCard()
  return (
    <Card>
      {data.renderHeader}
      <Separator />
      <CardContent className='@container/form'>
        {data.renderContent}
      </CardContent>
      <Separator />
      {data.renderFooter}
    </Card>
  )
}

export function FormCardHeader({
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader {...props} />
}

export function FormCardTitle({
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle {...props} />
}

export function FormCardDescription({
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return <CardDescription {...props} />
}

export function FormCardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('w-full grid @[640px]/form:grid-cols-2 gap-4', className)}
      {...props}
    />
  )
}

export function FormCardFooter({
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return <CardFooter {...props} />
}

export function FormCardHandle({ ...props }: React.ComponentProps<'form'>) {
  return <form {...props} />
}
