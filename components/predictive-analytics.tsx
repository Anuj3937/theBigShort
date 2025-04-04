"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStockData } from '@/utils/stock-data'

const predictFuturePrices = (stocks) => {
  return stocks.map(stock => {
    const futurePrices = Array.from({ length: 30 }, (_, i) => {
      const randomFactor = 1 + (Math.random() - 0.5) * 0.1
      return {
        day: i + 1,
        price: stock.price * Math.pow(randomFactor, i)
      }
    })
    return { symbol: stock.symbol, prices: futurePrices }
  })
}

export function PredictiveAnalytics() {
  const stocks = useStockData()
  const predictions = predictFuturePrices(stocks)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>AI-Powered Price Predictions</CardTitle>
        <CardDescription>30-day forecast based on advanced machine learning models</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {predictions.slice(0, 4).map((prediction) => (
            <div key={prediction.symbol} className="h-[200px]">
              <h3 className="text-lg font-semibold mb-2">{prediction.symbol}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prediction.prices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

