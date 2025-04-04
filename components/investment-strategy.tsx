"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function InvestmentStrategy() {
  const [investmentGoal, setInvestmentGoal] = useState('growth')
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [investmentHorizon, setInvestmentHorizon] = useState(10)

  const generateStrategy = () => {
    // This is a simplified strategy generation
    let stocks, bonds, cash, realEstate, commodities
    
    if (investmentGoal === 'growth') {
      stocks = 60 + (riskTolerance - 50) / 2
      bonds = 30 - (riskTolerance - 50) / 2
      cash = 5
      realEstate = 3
      commodities = 2
    } else if (investmentGoal === 'income') {
      stocks = 30 + (riskTolerance - 50) / 2
      bonds = 50 - (riskTolerance - 50) / 2
      cash = 10
      realEstate = 7
      commodities = 3
    } else {
      stocks = 45 + (riskTolerance - 50) / 2
      bonds = 40 - (riskTolerance - 50) / 2
      cash = 7
      realEstate = 5
      commodities = 3
    }

    return [
      { name: 'Stocks', value: stocks },
      { name: 'Bonds', value: bonds },
      { name: 'Cash', value: cash },
      { name: 'Real Estate', value: realEstate },
      { name: 'Commodities', value: commodities },
    ]
  }

  const [strategy, setStrategy] = useState(generateStrategy())

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Personalized Investment Strategy</CardTitle>
        <CardDescription>Generate a custom strategy based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="investment-goal" className="block text-sm font-medium text-gray-700">
              Investment Goal
            </label>
            <Select value={investmentGoal} onValueChange={setInvestmentGoal}>
              <SelectTrigger id="investment-goal">
                <SelectValue placeholder="Select your investment goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            />
            <p className="mt-1 text-sm text-gray-500">Current risk tolerance: {riskTolerance}%</p>
          </div>
          <div>
            <label htmlFor="investment-horizon" className="block text-sm font-medium text-gray-700">
              Investment Horizon (years)
            </label>
            <Slider
              id="investment-horizon"
              min={1}
              max={30}
              step={1}
              value={[investmentHorizon]}
              onValueChange={(value) => setInvestmentHorizon(value[0])}
            />
            <p className="mt-1 text-sm text-gray-500">Current investment horizon: {investmentHorizon} years</p>
          </div>
          <Button onClick={() => setStrategy(generateStrategy())}>Generate Strategy</Button>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strategy}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {strategy.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

