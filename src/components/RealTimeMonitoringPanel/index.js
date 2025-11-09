import { Component } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styled from "styled-components";
import GaugeChart from "./GaugeChart";
import FaultDetectionPanel from "../FaultDetectionPanel";

const RealTimeMonitoringPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  gap: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterItem = styled.div`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.active ? "#16a34a" : "#f8fafc")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
`;

const ChartWrapper = styled.div`
  flex: 1;
  background-color: #d5dbf1ff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ChartTitle = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`;

class RealTimeMonitoringPanel extends Component {
    state = {
        Voltage: 13.8,
        RPM: 900,
        PowerFactor: 0.95,
        current: true,
        temperature: false,
        vibration: false,
    };

    toggleFilter = (filterName) => {
        this.setState((prevState) => ({
            [filterName]: !prevState[filterName],
        }));
    };

    generateTimestamps = (seconds) => {
        const now = Date.now();
        const timestamps = [];
        for (let i = seconds - 1; i >= 0; i--) {
            timestamps.push(now - i * 1000);
        }
        return timestamps;
    };

    generateLineChartData = (seconds) => {
        const timestamps = this.generateTimestamps(seconds);

        const currentData = timestamps.map((t) => ({
            time: t,
            value: +(Math.random() * 10 + 5).toFixed(2),
        }));

        const temperatureData = timestamps.map((t) => ({
            time: t,
            value: +(Math.random() * 15 + 20).toFixed(2),
        }));

        const vibrationData = timestamps.map((t) => ({
            time: t,
            value: +(Math.random() * 2).toFixed(3),
        }));

        return { currentData, temperatureData, vibrationData };
    };

    render() {
        const { Voltage, RPM, PowerFactor, current, temperature, vibration } = this.state;
        const { currentData, temperatureData, vibrationData } = this.generateLineChartData(60);

        const gauges = [
            { label: "Voltage (V)", value: Voltage, maxValue: 14.4, startAngle: -90, endAngle: 90 },
            { label: "RPM", value: RPM, maxValue: 7000, startAngle: -90, endAngle: 90 },
            { label: "Power Factor", value: PowerFactor * 100, maxValue: 100, startAngle: -90, endAngle: 90 },
        ];

        const fault = {
            type: "Motor Overheat",
            status: "Active",
            severity: "Critical",
            color: "#dc2626",
            anomaly: 0.85,
        };

        const lineSeries = [];
        if (current) lineSeries.push({ label: "Current", data: currentData });
        if (vibration) lineSeries.push({ label: "Vibration", data: vibrationData });
        if (temperature) lineSeries.push({ label: "Temperature", data: temperatureData });
        if (lineSeries.length === 0) {
            lineSeries.push({ label: "Current", data: currentData });
            if (!current) this.setState({ current: true });
        }


        return (
            <>
                <RealTimeMonitoringPanelContainer>
                    {gauges.map((gauge, index) => (
                        <ChartWrapper key={index}>
                            <ChartTitle>{gauge.label}</ChartTitle>
                            <GaugeChart
                                value={gauge.value}
                                startAngle={gauge.startAngle}
                                endAngle={gauge.endAngle}
                                maxValue={gauge.maxValue}
                            />
                        </ChartWrapper>
                    ))}
                </RealTimeMonitoringPanelContainer>

                <FiltersContainer>
                    <FilterItem active={current} onClick={() => this.toggleFilter("current")}>
                        Current
                    </FilterItem>
                    <FilterItem active={temperature} onClick={() => this.toggleFilter("temperature")}>
                        Temperature
                    </FilterItem>
                    <FilterItem active={vibration} onClick={() => this.toggleFilter("vibration")}>
                        Vibration
                    </FilterItem>
                </FiltersContainer>

                {lineSeries.length > 0 && (
                    <RealTimeMonitoringPanelContainer>
                        <ChartWrapper>
                            <LineChart
                                xAxis={[{ data: lineSeries[0].data.map((d) => d.time) }]}
                                series={lineSeries.map((series) => ({
                                    data: series.data.map((d) => d.value),
                                    showMark: ({ index }) => index % 2 === 0,
                                    label: series.label,
                                }))}
                                height={300}
                            />

                        </ChartWrapper>
                        <FaultDetectionPanel fault={fault} />
                    </RealTimeMonitoringPanelContainer>
                )}
            </>
        );
    }
}

export default RealTimeMonitoringPanel;
