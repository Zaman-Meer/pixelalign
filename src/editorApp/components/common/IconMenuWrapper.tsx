import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import CustomToolTip from "./CustomToolTip"

interface Props {
  Icon: any
  tLabel: string
  minMenuW?: number | string
  disabled?: boolean
}

const IconMenuWrapper: React.FC<Props> = ({
  Icon,
  tLabel,
  disabled,
  minMenuW = 224,
  children,
}) => {
  return (
    <Menu>
      <CustomToolTip label={tLabel}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Icon />}
          fontSize={22}
          color="gray.400"
          variant="outline"
          border="2px"
          borderColor={"teal.200"}
          _hover={{ bg: "teal.50", borderColor: "teal.400" }}
          _active={{
            bg: "teal.50",
            border: "2px",
            borderColor: "teal.400",
            color: "teal.400",
          }}
          _disabled={{
            cursor: "default",
            bg: "white",
            opacity: "0.4",
            borderColor: "gray.300",
            color: "gray.400",
          }}
          size="sm"
          disabled={disabled}
        />
      </CustomToolTip>
      <MenuList boxShadow="md" padding={2} minWidth={minMenuW}>
        {children}
      </MenuList>
    </Menu>
  )
}

export default IconMenuWrapper
