import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import OverViewPanel from "./components/OverViewPanel";
import RealTimeMonitoringPanel from "./components/RealTimeMonitoringPanel";
import PredictivePanel from "./components/PredictivePanel";

const AppContainer = styled.div`
  background: linear-gradient(135deg, #e0e7ff, #f1f5f9);
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #1e3a8a, #3730a3);
  padding: 0 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  padding: 20px 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? "#1e3a8a" : "white"};
  background: ${props => props.active ? "white" : "transparent"};
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: ${props => props.active ? "white" : "rgba(255, 255, 255, 0.1)"};
    transform: translateY(-2px);
    border-color: ${props => props.active ? "transparent" : "rgba(255, 255, 255, 0.3)"};
  }
`;

const MainContent = styled.main`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #1e3a8a;
  letter-spacing: 1px;
`;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionCard = styled.div`
  background-color: #ffffffcc;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 20px;
  border-bottom: 2px solid #6366f1;
  display: inline-block;
  padding-bottom: 5px;
`;

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  return (
    <Nav>
      <Logo>Machine Dashboard</Logo>
      <NavLinks>
        <NavLink 
          to="/" 
          active={location.pathname === "/" ? 1 : 0}
        >
          Complete Dashboard
        </NavLink>
        <NavLink 
          to="/overview" 
          active={location.pathname === "/overview" ? 1 : 0}
        >
          Overview
        </NavLink>
        <NavLink 
          to="/monitoring" 
          active={location.pathname === "/monitoring" ? 1 : 0}
        >
          Real-Time Monitoring
        </NavLink>
        <NavLink 
          to="/predictive" 
          active={location.pathname === "/predictive" ? 1 : 0}
        >
          Predictive Analysis
        </NavLink>
      </NavLinks>
    </Nav>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <>
      <Title>Machine Dashboard Overview</Title>
      <PanelContainer>
        <SectionCard>
          <SectionTitle>Overview Panel</SectionTitle>
          <OverViewPanel />
        </SectionCard>
        <SectionCard>
          <SectionTitle>Real-Time Monitoring</SectionTitle>
          <RealTimeMonitoringPanel />
        </SectionCard>
        <SectionCard>
          <SectionTitle>Prediction & Forecast</SectionTitle>
          <PredictivePanel />
        </SectionCard>
      </PanelContainer>
    </>
  );
};

// Individual Panel Pages
const MonitoringPage = () => {
  return (
    <>
      <Title>Real-Time Monitoring</Title>
      <SectionCard>
        <RealTimeMonitoringPanel />
      </SectionCard>
    </>
  );
};

const PredictivePage = () => {
  return (
    <>
      <Title>Predictive Analysis</Title>
      <SectionCard>
        <PredictivePanel />
      </SectionCard>
    </>
  );
};

const OverviewPage = () => {
  return (
    <>
      <Title>Machine Overview</Title>
      <SectionCard>
        <OverViewPanel />
      </SectionCard>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Navigation />
        </Header>
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/predictive" element={<PredictivePage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;