import React, { Component } from "react";
import readMachineData from "../Services/firebaseService";
import BasicBars from "../BarChart/bar";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";

const PredictivePanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  gap: 20px;
  background: linear-gradient(135deg, #eef2ff, #e0f2fe);
  border-radius: 16px;
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

class PredictivePanel extends Component {
    state = {
        bearing: [],
        mjam: [],
        overload: [],
        rotor: [],
        shaft: [],
        stator: [],
        rul: [],
        volt: [],
        faultProbabilities: [],
        rulForecast: [],
        anomalyScores: [],
        efficiency: [],
        filters: {
            rul_forecast: true,
            anomaly_scores: false,
            efficiency_trend: false,
        },
    };

    componentDidMount() {
        this.fetchAndUpdate();
        this.interval = setInterval(this.fetchAndUpdate, 2000); 
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchAndUpdate = async () => {
        const data = await readMachineData();
        if (!data) return;

        const {
            bearing,
            mjam,
            overload,
            rotor,
            shaft,
            stator,
            rul,
            volt,
        } = data;

        const ranges = {
            bearing: { min: 0, max: 100 },
            mjam: { min: 0, max: 50 },
            overload: { min: 0, max: 50 },
            rotor: { min: 0, max: 100 },
            shaft: { min: 0, max: 100 },
            stator: { min: 0, max: 100 },
            rul: { min: 0, max: 100 },
            volt: { min: 0, max: 15 },
        };

        const normalize = (value, min, max) => {
            return Math.min(Math.max((value - min) / (max - min), 0), 1); 
        };

        const faultProbabilities = [
            { name: "bearing", value: normalize(bearing, ranges.bearing.min, ranges.bearing.max) },
            { name: "mjam", value: normalize(mjam, ranges.mjam.min, ranges.mjam.max) },
            { name: "overload", value: normalize(overload, ranges.overload.min, ranges.overload.max) },
            { name: "rotor", value: normalize(rotor, ranges.rotor.min, ranges.rotor.max) },
            { name: "shaft", value: normalize(shaft, ranges.shaft.min, ranges.shaft.max) },
            { name: "stator", value: normalize(stator, ranges.stator.min, ranges.stator.max) },
        ];

        const rulForecastValue = normalize(rul - (overload + bearing) * 0.1, ranges.rul.min, ranges.rul.max);

        const anomalyScoreValue = normalize(Math.abs(rul - 85) / 85, 0, 1); 

        const efficiencyValue = normalize((volt / (overload + 1)) * 0.85, 0, 1);


        this.setState((prevState) => ({
            bearing: [...prevState.bearing, bearing],
            mjam: [...prevState.mjam, mjam],
            overload: [...prevState.overload, overload],
            rotor: [...prevState.rotor, rotor],
            shaft: [...prevState.shaft, shaft],
            stator: [...prevState.stator, stator],
            rul: [...prevState.rul, rul],
            volt: [...prevState.volt, volt],
            faultProbabilities,
            rulForecast: [...prevState.rulForecast, rulForecastValue],
            anomalyScores: [...prevState.anomalyScores, anomalyScoreValue],
            efficiency: [...prevState.efficiency, efficiencyValue],
        }));
    };

    toggleFilter = (filterName) => {
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [filterName]: !prevState.filters[filterName],
            },
        }));
    };

    render() {
        const { faultProbabilities, rulForecast, anomalyScores, efficiency, filters } =
            this.state;

        const lineSeries = [];
        if (filters.rul_forecast && rulForecast.length)
            lineSeries.push({ label: "RUL", data: rulForecast });
        if (filters.anomaly_scores && anomalyScores.length)
            lineSeries.push({ label: "Anomaly", data: anomalyScores });
        if (filters.efficiency_trend && efficiency.length)
            lineSeries.push({ label: "Efficiency", data: efficiency });

        if (lineSeries.length === 0) { lineSeries.push({ label: "RUL", data: rulForecast }); if (!filters.rul_forecast) { this.setState((prevState) => ({ filters: { ...prevState.filters, rul_forecast: true } })); } }

        return (
            <div className="panel">
                <h2>🔮 Prediction & Forecast Panel</h2>

                <ChartWrapper>
                    <ChartTitle>Fault Probability (avg across records)</ChartTitle>
                    <BasicBars faultProbabilities={faultProbabilities} />
                </ChartWrapper>
                <br />

                <FiltersContainer>
                    <FilterItem
                        active={filters.rul_forecast}
                        onClick={() => this.toggleFilter("rul_forecast")}
                    >
                        RUL Forecast
                    </FilterItem>
                    <FilterItem
                        active={filters.anomaly_scores}
                        onClick={() => this.toggleFilter("anomaly_scores")}
                    >
                        Anomaly Scores
                    </FilterItem>
                    <FilterItem
                        active={filters.efficiency_trend}
                        onClick={() => this.toggleFilter("efficiency_trend")}
                    >
                        Efficiency Trend
                    </FilterItem>
                </FiltersContainer>

                {lineSeries.length > 0 && (
                    <PredictivePanelContainer>
                        <ChartWrapper>
                            <LineChart
                                xAxis={[{ data: Array.from({ length: lineSeries[0].data.length }, (_, i) => i + 1) }]}
                                series={lineSeries.map((s) => ({
                                    data: s.data,
                                    label: s.label,
                                }))}
                                height={300}
                            />
                        </ChartWrapper>
                    </PredictivePanelContainer>
                )}
            </div>
        );
    }
}

export default PredictivePanel;
