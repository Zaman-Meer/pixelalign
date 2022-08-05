import { useCanvasContext } from "@/editorApp/components/Canvas/hooks"
import styled from "styled-components"

interface ContainerProps {
  isActive: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 0 5px;
  margin-top: 5px;
  border-left: ${(props) =>
    props.isActive
      ? "3px solid  var(--chakra-colors-teal-700)"
      : "3px solid transparent"};
`

const ItemContainer = styled.div<ContainerProps>`
  cursor: pointer;
  color: ${(props) =>
    props.isActive ? " var(--chakra-colors-teal-600)" : "rgba(7, 7, 7, 0.64)"};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.6rem;
  font-weight: bold;
  border-radius: 18px;
  transition: "all 0.5s";
  &:hover {
    color: #000000;
  }
`
interface Props {
  name: string
  icon: string
  label: string
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function PanelListItem({ name, icon, setActiveTab, activeTab, label }: Props) {
  const { toggleSidePanel } = useCanvasContext()
  const isActive = name === activeTab
  const handleActive = (name: string) => {
    toggleSidePanel(true)
    setActiveTab(name)
  }
  return (
    <Container isActive={isActive}>
      <ItemContainer
        isActive={isActive}
        className={`${isActive ? "PanelListItem active" : "PanelListItem"}`}
        key={name}
        onClick={() => handleActive(name)}
      >
        <i className="material-icons">{icon}</i>
        <div style={{ paddingTop: "0.2rem" }}>{label}</div>
      </ItemContainer>
    </Container>
  )
}

export default PanelListItem
