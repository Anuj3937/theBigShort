"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStockData } from '@/utils/stock-data'

export function RiskManagement() {
  const stocks = useStockData()
  const [riskTolerance, setRiskTolerance] = useState(50)

  const calculateRiskScore = (stock) => {
    // This is a simplified risk calculation
    const volatility = Math.abs(stock.changePercent)
    return (volatility * 100 / riskTolerance).toFixed(2)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Advanced Risk Management</CardTitle>
        <CardDescription>Adjust your risk tolerance and view personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="risk-tolerance" className="block text-sm font-medium text-gray-700">
              Risk Tolerance
            </label>
            <Slider
              id="risk-tolerance"
              min={0}
              max={100}
              step={1}
              value={[riskTolerance]}
              onValueChange={(value) => setRiskTolerance(value[0])}
              className="mt-2"
            />
            <p className="mt-1 text-sm text-gray-500">Current risk tolerance: {riskTolerance}%</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => {
                const riskScore = calculateRiskScore(stock)
                return (
                  <TableRow key={stock.symbol}>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>${stock.price.toFixed(2)}</TableCell>
                    <TableCell>{riskScore}</TableCell>
                    <TableCell>
                      {riskScore < 50 ? "Hold" : riskScore < 75 ? "Monitor" : "Consider Selling"}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

