"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    subject: "Math",
    current: 92,
    average: 78,
  },
  {
    subject: "Science",
    current: 76,
    average: 74,
  },
  {
    subject: "English",
    current: 88,
    average: 80,
  },
  {
    subject: "History",
    current: 85,
    average: 76,
  },
  {
    subject: "Art",
    current: 94,
    average: 82,
  },
]

export function StudentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="subject" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Bar
          dataKey="current"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          name="Emily's Score"
        />
        <Bar dataKey="average" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-muted" name="Class Average" />
        <Tooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  )
}

