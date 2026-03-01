import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { tv } from "tailwind-variants"

type Variant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
type Size = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

interface ButtonProps extends ButtonPrimitive.Props {
  variant?: Variant
  size?: Size
  className?: string
}

const button = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent",
    "text-sm font-medium outline-none cursor-pointer select-none transition-all duration-150",
    "bg-clip-padding disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  ],
  variants: {
    variant: {
      default: "bg-neutral-900 text-white hover:opacity-85",
      outline: "border-current bg-white hover:bg-neutral-100",
      secondary: "bg-neutral-200 text-neutral-900 hover:opacity-80",
      ghost: "bg-transparent hover:bg-neutral-100",
      destructive: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
      link: "text-neutral-900 no-underline underline-offset-4 hover:underline",
    },
    size: {
      default: "h-8 px-2.5 gap-1.5",
      xs: "h-6 px-2 gap-1 text-xs rounded-md [&_svg]:size-3",
      sm: "h-7 px-2.5 gap-1 text-[0.8rem] rounded-md [&_svg]:size-3.5",
      lg: "h-9 px-2.5 gap-1.5",
      icon: "size-8 p-0",
      "icon-xs": "size-6 p-0 rounded-md [&_svg]:size-3",
      "icon-sm": "size-7 p-0 rounded-md",
      "icon-lg": "size-9 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export default function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={button({ variant, size, className })}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps }