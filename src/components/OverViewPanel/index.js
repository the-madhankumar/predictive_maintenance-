import { Component } from "react";
import styled from "styled-components";
import KPICard from "../KPICard";

const MainOverPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;
`;

class OverViewPanel extends Component {
  state = {
    MotorHealthStatus: "Good",
    RunningStatus: "Running",
    RUL: "120 hrs",
    NextDue: "2025-11-20",
    PowerConsumption: "15.6 kWh",
  };

  render() {
    const { MotorHealthStatus, RunningStatus, RUL, NextDue, PowerConsumption } =
      this.state;

    const items = {
      "Motor Health Status": MotorHealthStatus,
      "Running Status": RunningStatus,
      "Remaining Useful Life": RUL,
      "Next Due": NextDue,
      "Power Consumption": PowerConsumption,
    };

    return (
      <MainOverPanelContainer>
        {Object.entries(items).map(([key, value], index) => (
          <KPICard 
            key={index}
            TextValue={key}
            NumericalValue={value}
          />
        ))}
      </MainOverPanelContainer>
    );
  }
}

export default OverViewPanel;
