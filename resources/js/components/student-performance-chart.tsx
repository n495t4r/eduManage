"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Jan",
    Mathematics: 85,
    Physics: 78,
    "English Literature": 82,
    "Computer Science": 90
  },
  {
    month: "Feb",
    Mathematics: 88,
    Physics: 80,
    "English Literature": 79,
    "Computer Science": 92
  },
  {
    month: "Mar",
    Mathematics: 90,
    Physics: 82,
    "English Literature": 81,
    "Computer Science": 88
  },
  {
    month: "Apr",
    Mathematics: 92,
    Physics: 85,
    "English Literature": 78,
    "Computer Science": 91
  },
  {
    month: "May",
    Mathematics: 89,
    Physics: 83,
    "English Literature": 80,
    "Computer Science": 93
  },
  {
    month: "Jun",
    Mathematics: 94,
    Physics: 87,
    "English Literature": 82,
    "Computer Science": 95
  }
]

export function StudentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[50, 100]}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Mathematics"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Physics"
          stroke="#06b6d4"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="English Literature"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="Computer Science"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
