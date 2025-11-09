import styled from "styled-components";
import OverViewPanel from "./components/OverViewPanel";
import RealTimeMonitoringPanel from "./components/RealTimeMonitoringPanel";

const AppContainer = styled.div`
  background-color: #f1f5f9;
  min-height: 100vh;
  padding: 40px;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #111827;
`;

function App() {
  return (
    <AppContainer>
      <Title>Dashboard</Title>
      <OverViewPanel />
      <RealTimeMonitoringPanel/>
    </AppContainer>
  );
}

export default App;
