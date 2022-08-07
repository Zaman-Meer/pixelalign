import React from "react"
import { Button, ButtonProps } from "@chakra-ui/button"
import CustomToolTip from "./CustomToolTip"

interface Props extends ButtonProps {
  tLabel: string
  tPosition?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-end"
    | "bottom-start"
    | "left"
    | "right"
}
const IconButtonWrapper: React.FC<Props> = ({
  tLabel,
  tPosition = "bottom",
  children,
  ...restProps
}) => {
  return (
    <CustomToolTip label={tLabel} position={tPosition}>
      <Button
        {...restProps}
        colorScheme="gray"
        _hover={{ color: "teal", backgroundColor: "gray.100" }}
        variant="ghost"
        size="s"
        padding={1}
      >
        {children}
      </Button>
    </CustomToolTip>
  )
}
export default IconButtonWrapper
