import styled from "styled-components";

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 25px 0;
  flex-wrap: wrap;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: ${props => props.color};
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  min-width: 100px;
`;

const LegendTitle = styled.h3`
  text-align: center;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  width: 100%;
`;

const StatusLegend = () => {
  const statusLevels = [
    { color: "#10b981", label: "Normal ✅", description: "All good!" },
    { color: "#f59e0b", label: "Warning ⚠️", description: "Needs attention" },
    { color: "#f97316", label: "Moderate 🔶", description: "Monitor closely" },
    { color: "#ef4444", label: "High 🚨", description: "Take action" },
    { color: "#7c2d12", label: "Crucial 🔴", description: "Critical issue" },
    { color: "#6b7280", label: "Below Normal 📉", description: "Under range" }
  ];

  return (
    <LegendContainer>
      <LegendTitle>Status Indicator Guide</LegendTitle>
      {statusLevels.map((level, index) => (
        <LegendItem key={index}>
          <ColorBox color={level.color} />
          <div>
            <StatusText>{level.label}</StatusText>
            <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>
              {level.description}
            </div>
          </div>
        </LegendItem>
      ))}
    </LegendContainer>
  );
};

export default StatusLegend;