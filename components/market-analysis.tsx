"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStockData } from '@/utils/stock-data'

const financialData = {
  AAPL: {
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
    eps: [
      { year: 2018, value: 2.98 },
      { year: 2019, value: 2.97 },
      { year: 2020, value: 3.28 },
      { year: 2021, value: 5.61 },
      { year: 2022, value: 6.11 },
    ],
  },
  // Add similar data for other stocks
}

export function MarketAnalysis() {
  const stocks = useStockData()
  const [selectedStock, setSelectedStock] = useState(stocks[0].symbol)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
        <CardDescription>Detailed financial data for each company</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select a stock" />
          </SelectTrigger>
          <SelectContent>
            {stocks.map((stock) => (
              <SelectItem key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="netIncome">Net Income</TabsTrigger>
            <TabsTrigger value="eps">EPS</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData[selectedStock].revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="netIncome">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData[selectedStock].netIncome}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="eps">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData[selectedStock].eps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

