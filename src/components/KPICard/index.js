import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #f8fafc;
  font-family: 'Roboto';
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 180px;
`;

const Text = styled.p`
  font-weight: 600;
  color: #111827;
`;

const Value = styled.p`
  font-size: 1.2rem;
  color: #2563eb;
`;

const KPICard = ({ TextValue, NumericalValue }) => {
  return (
    <CardContainer>
      <Text>{TextValue}</Text>
      <Value>{NumericalValue}</Value>
    </CardContainer>
  );
};

export default KPICard;
