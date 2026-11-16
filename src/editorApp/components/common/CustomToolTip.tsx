import { Tooltip } from "@chakra-ui/tooltip"
import React from "react"

interface Props {
  label: string
  children?: React.ReactNode
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-end"
    | "bottom-start"
    | "left"
    | "right"
}

const CustomToolTip: React.FC<Props> = ({
  label,
  position = "bottom",
  children,
}) => {
  return (
    <Tooltip
      hasArrow
      label={label}
      color="white"
      placement={position}
      borderRadius={5}
      shouldWrapChildren
      height={6}
      style={{ fontSize: "8px", lineHeight: `8px` }}
    >
      {children}
    </Tooltip>
  )
}

export default CustomToolTip
