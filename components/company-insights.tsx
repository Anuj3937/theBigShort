"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const financialData = {
  AAPL: {
    name: "Apple Inc.",
    revenue: [
      { year: 2018, value: 265595 },
      { year: 2019, value: 260174 },
      { year: 2020, value: 274515 },
      { year: 2021, value: 365817 },
      { year: 2022, value: 394328 },
    ],
    netIncome: [
      { year: 2018, value: 59531 },
      { year: 2019, value: 55256 },
      { year: 2020, value: 57411 },
      { year: 2021, value: 94680 },
      { year: 2022, value: 99803 },
    ],
  },
  GOOGL: {
    name: "Alphabet Inc.",
    revenue: [
      { year: 2018, value: 136819 },
      { year: 2019, value: 161857 },
      { year: 2020, value: 182527 },
      { year: 2021, value: 257637 },
      { year: 2022, value: 282836 },
    ],
    netIncome: [
      { year: 2018, value: 30736 },
      { year: 2019, value: 34343 },
      { year: 2020, value: 40269 },
      { year: 2021, value: 76033 },
      { year: 2022, value: 59972 },
    ],
  },
}

export function CompanyInsights() {
  const [selectedCompany, setSelectedCompany] = useState("AAPL")

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Company Insights</CardTitle>
        <CardDescription>Financial data and visualizations</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(financialData).map((symbol) => (
              <SelectItem key={symbol} value={symbol}>
                {financialData[symbol].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Revenue (in millions USD)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={financialData[selectedCompany].revenue}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Net Income (in millions USD)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={financialData[selectedCompany].netIncome}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

