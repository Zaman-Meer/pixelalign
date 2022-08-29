import styled from "styled-components"
import { useState } from "react"
import ClosePanel from "./ClosePanel"
import Panels from "./Panels"
import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import PanelEditImage from "./PanelEditImage"

interface ContainerProps {
  collapse: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  background: #ffffff; //#29303a;
  transition: width 0.4s;
  width: ${(props) => (props.collapse ? "330px" : "0px")};
  box-shadow: 9px -5px 5px -9px rgba(0, 0, 0, 0.21);
  -webkit-box-shadow: 9px -5px 5px -9px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 9px -5px 5px -9px rgba(0, 0, 0, 0.21);
  border-right: 1px solid var(--chakra-colors-teal-600);
`
interface Props {
  activeTab: string
}
function PanelsList({ activeTab }: Props) {
  const {
    isSidePanelOpen,
    toggleSidePanel,
    settingPanel,
    openSettingPanelType,
  } = useCanvasContext()

  return (
    <Container collapse={isSidePanelOpen}>
      <ClosePanel closePanel={() => toggleSidePanel(!isSidePanelOpen)} />
      {(!settingPanel || !openSettingPanelType) &&
        Panels[activeTab as "formats"]}
      {settingPanel && openSettingPanelType === "image" && <PanelEditImage />}
    </Container>
  )
}

export default PanelsList
