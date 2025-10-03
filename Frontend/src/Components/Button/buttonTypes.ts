import type { ComponentProps } from "react"
export type buttonTypes = {
    url ? : string,
    children : React.ReactNode
} & ComponentProps<"button">