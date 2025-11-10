import { Component } from "react";
import styled from "styled-components";
import KPICard from "../KPICard";
import readMachineData from "../Services/firebaseService";
import StatusLegend from "./Legend";

const PanelContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  border-radius: 16px;
`;

class OverViewPanel extends Component {
  state = {
    "Bearing Wear (A)": 0,
    "Rotor bar crack (Hz)": 0,
    "Overload (A)": 0,
    "Stator fault (THD)": 0,
    "Shaft misalignment (CF)": 0,
    "Voltage instability (V)": 0,
    "Efficiency loss (PF)": 0,
    "Mechanical jam (A)": 0,
    "Remaining Useful Life (Days)": 0,
  };

  thresholds = {
    "Bearing Wear (A)": {
      normal: [0, 3],
      warning: [3, 3.3],
      moderate: [3.3, 3.4],
      high: [3.4, 3.5],
      crucial: [3.5, 3.6],
      unit: "A"
    },
    "Rotor bar crack (Hz)": {
      normal: [48, 52],
      warning: [52, 60],
      moderate: [61, 65],
      high: [66, 70],
      crucial: [71, 80],
      unit: "Hz"
    },
    "Overload (A)": {
      normal: [0, 2],
      warning: [2, 3],
      moderate: [4, 5],
      high: [6, 7],
      crucial: [8, 8],
      unit: "A"
    },
    "Stator fault (THD)": {
      normal: [7, 11],
      warning: [12, 18],
      moderate: [19, 23],
      high: [24, 35],
      crucial: [35, 46],
      unit: "THD"
    },
    "Shaft misalignment (CF)": {
      normal: [1.2, 1.5],
      warning: [1.6, 2.5],
      moderate: [2.6, 3.0],
      high: [3.1, 3.5],
      crucial: [3.6, 4.0],
      unit: "CF"
    },
    "Voltage instability (V)": {
      normal: [190, 200],
      warning: [201, 205],
      moderate: [206, 210],
      high: [211, 215],
      crucial: [216, 220],
      unit: "V"
    },
    "Efficiency loss (PF)": {
      normal: [0.9, 1.2],
      warning: [0.1, 0.2],
      moderate: [0.3, 0.4],
      high: [0.5, 0.6],
      crucial: [0.7, 0.8],
      unit: "PF"
    },
    "Mechanical jam (A)": {
      normal: [3, 4.5],
      warning: [4.6, 5.6],
      moderate: [5.7, 6.7],
      high: [7.7, 8.7],
      crucial: [8.8, 9.8],
      unit: "A"
    },
    "Remaining Useful Life (Days)": {
      normal: [30, Infinity],
      warning: [15, 29],
      moderate: [7, 14],
      high: [3, 6],
      crucial: [0, 2],
      unit: "Days"
    }
  };

  getStatusColor = (parameter, value) => {
    const threshold = this.thresholds[parameter];
    if (!threshold) return "#2563eb"; // default blue

    if (parameter === "Remaining Useful Life (Days)") {
      if (value >= threshold.normal[0]) return "#10b981"; // green
      if (value >= threshold.warning[0]) return "#f59e0b"; // amber
      if (value >= threshold.moderate[0]) return "#f97316"; // orange
      if (value >= threshold.high[0]) return "#ef4444"; // red
      return "#7c2d12";
    }

    if (value >= threshold.crucial[0]) return "#7c2d12"; // dark red
    if (value >= threshold.high[0]) return "#ef4444"; // red
    if (value >= threshold.moderate[0]) return "#f97316"; // orange
    if (value >= threshold.warning[0]) return "#f59e0b"; // amber
    if (value >= threshold.normal[0]) return "#10b981"; // green

    return "#6b7280";
  };

  async componentDidMount() {
    const data = await readMachineData();
    if (!data) return;

    this.setState({
      "Bearing Wear (A)": data.bearing,
      "Rotor bar crack (Hz)": data.rotor,
      "Overload (A)": data.overload,
      "Stator fault (THD)": data.stator,
      "Shaft misalignment (CF)": data.shaft,
      "Voltage instability (V)": data.volt,
      "Efficiency loss (PF)": data.efficiency || 0.95,
      "Mechanical jam (A)": data.mjam,
      "Remaining Useful Life (Days)": data.rul,
    });
  }

  render() {
    return (
      <>
      <StatusLegend/>
      <PanelContainer>
        
        {Object.entries(this.state).map(([key, value], index) => (
          <KPICard 
            key={index} 
            TextValue={key} 
            NumericalValue={value}
            color={this.getStatusColor(key, value)}
          />
        ))}
      </PanelContainer></>
    
    );
  }
}

export default OverViewPanel;