"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const sentimentData = [
  { symbol: 'AAPL', sentiment: 75, volume: 1000000 },
  { symbol: 'GOOGL', sentiment: 62, volume: 750000 },
  { symbol: 'MSFT', sentiment: 80, volume: 900000 },
  { symbol: 'AMZN', sentiment: 58, volume: 850000 },
  { symbol: 'FB', sentiment: 45, volume: 700000 },
]

export function MarketSentiment() {
  const [data, setData] = useState(sentimentData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          sentiment: Math.max(0, Math.min(100, item.sentiment + (Math.random() - 0.5) * 10)),
          volume: Math.max(0, item.volume + (Math.random() - 0.5) * 100000)
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 70) return 'bg-green-500'
    if (sentiment >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Real-Time Market Sentiment</CardTitle>
        <CardDescription>Live sentiment analysis based on social media and news</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.symbol} className="flex items-center space-x-4">
              <div className="w-16">{item.symbol}</div>
              <Progress value={item.sentiment} className={`flex-1 ${getSentimentColor(item.sentiment)}`} />
              <Badge variant="outline">{item.sentiment.toFixed(1)}%</Badge>
              <div className="w-24 text-right text-sm text-muted-foreground">
                Vol: {(item.volume / 1000000).toFixed(2)}M
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

