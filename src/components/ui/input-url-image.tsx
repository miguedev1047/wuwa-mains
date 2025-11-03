import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { CheckIcon, ClipboardIcon, EyeIcon } from 'lucide-react'

export interface InputUrlImageProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  id: string
}

const TIME_CLEAR = 1500
const URL_START = ['https://', 'http://']

const isImageUrl = (url: string): boolean => {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.bmp',
  ]
  const lowerUrl = url.toLowerCase()
  return (
    imageExtensions.some((ext) => lowerUrl.includes(ext)) ||
    lowerUrl.includes('image') ||
    lowerUrl.includes('img') ||
    lowerUrl.includes('photo')
  )
}

export function InputUrlImage(props: InputUrlImageProps) {
  const { disabled, onChange, value = '', id, placeholder } = props
  
  const [successPaste, setSuccessPaste] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const VALID_LINK = URL_START.some((start) => value.startsWith(start))
  const IS_IMAGE_URL = VALID_LINK && isImageUrl(value)

  const onSuccessPaste = (time: number) => {
    const successPasteTimout = setTimeout(() => {
      setSuccessPaste(false)
    }, time)
    return () => clearTimeout(successPasteTimout)
  }

  const handlePaste = async () => {
    if (VALID_LINK) return toast.error('Link inválido') // Fixed logic - should show error when link is NOT valid

    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      setSuccessPaste(true) // Set success state immediately
      onSuccessPaste(TIME_CLEAR)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
      toast.error('No se pudo acceder al portapapeles')
    }
  }

  return (
    <div className='relative'>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        autoComplete='off'
        className={`peer ${IS_IMAGE_URL ? 'pe-20' : 'pe-10'}`}
      />

      <div className='absolute right-0 top-0 flex h-full items-center'>
        {/* Added h-full and items-center for proper alignment */}
        {IS_IMAGE_URL && (
          <TooltipProvider>
            <Tooltip>
              <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      type='button'
                      variant='ghost'
                      disabled={disabled}
                      size='icon'
                      className='h-8 w-8 hover:bg-muted' // Adjusted size and hover color
                    >
                      <EyeIcon className='h-4 w-4' />
                      <span className='sr-only'>Previsualizar imagen</span>
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent
                  className='w-80 p-2'
                  side='bottom'
                  align='end'
                >
                  <div className='space-y-3'>
                    <p className='text-sm text-center font-medium'>
                      Previsualización de imagen
                    </p>
                    <div className='relative'>
                      <img
                        src={value || '/placeholder.svg'}
                        alt='Preview'
                        className='w-full aspect-square object-cover rounded-md'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const errorDiv =
                            target.nextElementSibling as HTMLElement
                          if (errorDiv) errorDiv.style.display = 'flex'
                        }}
                      />
                      <div className='hidden w-full h-48 bg-muted rounded-md items-center justify-center text-muted-foreground text-sm'>
                        No se pudo cargar la imagen
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipContent side='bottom'>
                <p>Previsualizar imagen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                onClick={handlePaste}
                variant='ghost'
                disabled={disabled}
                size='icon'
                className='h-8 w-8 hover:bg-muted' // Adjusted size and hover color
              >
                {successPaste ? (
                  <CheckIcon className='h-4 w-4 text-green-500' />
                ) : (
                  <ClipboardIcon className='h-4 w-4' />
                )}
                <span className='sr-only'>Pegar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Pegar desde portapapeles</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
