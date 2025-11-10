import styled from "styled-components";

const CardContainer = styled.div`
  flex: 1;
  min-width: 140px;
  background: linear-gradient(135deg, #eef2ff, #d5dbf1ff);
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 5px solid ${props => props.color || "#2563eb"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }
`;

const Text = styled.p`
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const Value = styled.p`
  font-size: 1.4rem;
  color: ${props => props.color || "#2563eb"};
  font-weight: 700;
`;

const KPICard = ({ TextValue, NumericalValue, color }) => {
  return (
    <CardContainer color={color}>
      <Text>{TextValue}</Text>
      <Value color={color}>{NumericalValue}</Value>
    </CardContainer>
  );
};

export default KPICard;