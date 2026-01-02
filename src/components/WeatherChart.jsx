import React from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="time">{label}</p>
        <p className="temp">{`${payload[0].value}°`}</p>
      </div>
    );
  }
  return null;
};

const WeatherChart = () => {
  const { hourly } = useSelector((state) => state.weather);
  const { units } = useSelector((state) => state.ui);

  if (!hourly || hourly.length === 0) return null;

  // Prepare data: take next 24 hours
  const data = hourly.slice(0, 24).map(hour => {
    const date = new Date(hour.time);
    const temp = hour.values.temperature;
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: units === 'metric' ? Math.round(temp) : Math.round((temp * 9/5) + 32),
    };
  });

  return (
    <div className="weather-chart card fade-in">
      <div className="weather-chart__header">
        <h3>24-Hour Temperature Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#71B280" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#71B280" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} unit="°" width={40} />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="temp" 
            stroke="#71B280" 
            fillOpacity={1} 
            fill="url(#colorTemp)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
