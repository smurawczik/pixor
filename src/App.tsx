import styled from "styled-components";
import { AppLayout } from "./components/AppLayout";
import { Providers } from "./components/Providers";
import { GlobalStyle } from "./styles/GlobalStyle";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

function App() {
  return (
    <Providers>
      <StyledApp>
        <GlobalStyle />
        <AppLayout />
      </StyledApp>
    </Providers>
  );
}

export default App;
