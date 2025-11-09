import { Component } from "react";
import styled from "styled-components";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const FaultCard = styled.div`
  background-color: #d5dbf1ff;
  font-family: 'Roboto';
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 220px;
  text-align: center;
`;

const FaultType = styled.p`
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const StatusTag = styled.span`
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  color: #fff;
  margin-bottom: 10px;
`;

const GaugeContainer = styled.div`
  padding-top: 50px;
`;

class FaultDetectionPanel extends Component {
    getAnomalyColor = (score) => {
        if (score > 0.7) return "#dc2626";
        if (score > 0.4) return "#facc15";
        return "#16a34a";
    };

    render() {
        const { type, status, severity, color, anomaly } = this.props.fault;

        return (
            <FaultCard>
                <FaultType>Type : {type}</FaultType>
                <StatusTag color={color}>Status : {status} / {severity}</StatusTag>
                <GaugeContainer>
                    <Gauge
                        width={200}
                        height={200}
                        value={Number((anomaly * 100).toFixed(0))}
                        cornerRadius="50%"
                        text={() => `Anomaly ${(anomaly * 100).toFixed(0)}%`}
                        sx={{
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                fontWeight: 600,
                                fill: this.getAnomalyColor(anomaly),
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#52b202',
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                                fill: '#e5e7eb',
                            },
                        }}
                    />
                </GaugeContainer>
            </FaultCard>
        );
    }
}

export default FaultDetectionPanel;
