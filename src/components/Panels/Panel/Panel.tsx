import styled from "styled-components"
import { useState } from "react"
import ClosePanel from "./ClosePanel"
import Panels from "./Panels"
import { useCanvasContext } from '@/components/Canvas/hooks'

interface ContainerProps {
  collapse: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  background: #29303a;
  transition: width 0.4s;
  width: ${(props) => (props.collapse ? "370px" : "0px")};
`
interface Props {
  activeTab: string

}
function PanelsList({ activeTab }: Props) {
  const { isSidePanelOpen, toggleSidePanel} = useCanvasContext()

  return (
    <Container collapse={isSidePanelOpen}>
      <ClosePanel closePanel={() => toggleSidePanel(!isSidePanelOpen)} />
      {Panels[activeTab as "formats"]}
    </Container>
  )
}

export default PanelsList
