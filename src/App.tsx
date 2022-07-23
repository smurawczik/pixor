import styled from "styled-components";
import { AppLayout } from "./components/AppLayout";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <StyledApp>
      <AppLayout />
    </StyledApp>
  );
}

export default App;
