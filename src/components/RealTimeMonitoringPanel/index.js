import { Component } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styled from "styled-components";
import GaugeChart from "./GaugeChart";
import FaultDetectionPanel from "../FaultDetectionPanel";
import readMachineData from "../Services/firebaseService";

const RealTimeMonitoringPanelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  gap: 20px;
  background: linear-gradient(135deg, #eef2ff, #e0f2fe);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterItem = styled.div`
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  border: 1px solid ${(props) => (props.active ? "#2563eb" : "#ccc")};
  background-color: ${(props) => (props.active ? "#2563eb" : "#f0f9ff")};
  color: ${(props) => (props.active ? "#fff" : "#1e293b")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#1e40af" : "#bae6fd")};
    border-color: ${(props) => (props.active ? "#1e40af" : "#60a5fa")};
  }
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ChartTitle = styled.p`
  font-weight: 700;
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

class RealTimeMonitoringPanel extends Component {
    state = {
        Voltage: 0,
        RPM: 1200,
        PowerFactor: 0.95,
        currentList: [],
        temperatureList: [],
        vibrationList: [],
        current: true,
        temperature: false,
        vibration: false,
        dataPoints: 0
    };

    componentDidMount() {
        this.fetchAndUpdate();
        this.intervalId = setInterval(this.fetchAndUpdate, 1000);
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    fetchAndUpdate = async () => {
        const data = await readMachineData();
        if (!data) return;

        this.setState(prevState => ({
            Voltage: data.volt || 0,
            PowerFactor: data.efficiency || 0.95,
            RPM: data.rpm || this.getRandomFloat(1000, 1400),
            currentList: [...prevState.currentList.slice(-49), data.overload || 0],
            temperatureList: [...prevState.temperatureList.slice(-49), this.getRandomFloat(30, 43)],
            vibrationList: [...prevState.vibrationList.slice(-49), this.getRandomFloat(48, 52)]
        }));
    };

    getRandomFloat = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    toggleFilter = (filterName) => {
        this.setState((prevState) => ({
            [filterName]: !prevState[filterName],
        }));
    };

    render() {
        const {
            Voltage,
            RPM,
            PowerFactor,
            current,
            temperature,
            vibration,
            currentList,
            temperatureList,
            vibrationList
        } = this.state;

        const lineSeries = [];
        if (current) lineSeries.push({
            label: "Current (A)",
            data: currentList,
            color: "#2563eb"
        });
        if (temperature) lineSeries.push({
            label: "Temperature (°C)",
            data: temperatureList,
            color: "#dc2626"
        });
        if (vibration) lineSeries.push({
            label: "Vibration (Hz)",
            data: vibrationList,
            color: "#16a34a"
        });

        if (lineSeries.length === 0) {
            lineSeries.push({
                label: "Current (A)",
                data: currentList,
                color: "#2563eb"
            });
        }

        const xAxisData = Array.from({ length: Math.max(currentList.length, temperatureList.length, vibrationList.length) }, (_, i) => i + 1);

        const gauges = [
            { label: "Voltage (V)", value: Voltage, maxValue: 250, startAngle: -90, endAngle: 90 },
            { label: "RPM", value: RPM, maxValue: 1400, startAngle: -90, endAngle: 90 },
            { label: "Power Factor", value: PowerFactor * 100, maxValue: 100, startAngle: -90, endAngle: 90 },
        ];

        const fault = {
            type: "Motor Overheat",
            status: "Active",
            severity: "Critical",
            color: "#dc2626",
            anomaly: 0.85,
        };

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

                <br />
                <br />

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

                <br />
                <br />

                <RealTimeMonitoringPanelContainer>
                    <ChartWrapper style={{ flex: 2 }}>
                        <ChartTitle>Real-time Monitoring</ChartTitle>
                        <LineChart
                            xAxis={[{
                                data: xAxisData,
                                label: "Time Sequence",
                                scaleType: 'point'
                            }]}
                            series={lineSeries.map((series) => ({
                                data: series.data,
                                label: series.label,
                                color: series.color
                            }))}
                            height={400}
                            margin={{ left: 70, right: 70, top: 30, bottom: 70 }}
                        />
                    </ChartWrapper>
                    <FaultDetectionPanel fault={fault} />
                </RealTimeMonitoringPanelContainer>
            </>
        );
    }
}

export default RealTimeMonitoringPanel;