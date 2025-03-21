import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    attendance: 89,
    performance: 78,
    revenue: 12500,
  },
  {
    name: "Feb",
    attendance: 92,
    performance: 81,
    revenue: 13250,
  },
  {
    name: "Mar",
    attendance: 90,
    performance: 76,
    revenue: 12800,
  },
  {
    name: "Apr",
    attendance: 93,
    performance: 82,
    revenue: 13600,
  },
  {
    name: "May",
    attendance: 91,
    performance: 79,
    revenue: 13100,
  },
  {
    name: "Jun",
    attendance: 94,
    performance: 85,
    revenue: 14200,
  },
]

export function Overview() {
  return (
    <>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View key performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <Bar dataKey="attendance" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            <Bar dataKey="performance" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/70" />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  )
}

