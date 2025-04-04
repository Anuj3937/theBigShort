import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    action: "Buy",
    reason: "Strong earnings forecast and new product launches",
    confidence: 0.85,
    price: 150.25,
    change: 2.5,
    analysis: "Apple's upcoming product lineup and services growth present significant upside potential. The company's strong cash position and consistent dividend growth make it an attractive long-term investment.",
    technicalIndicators: {
      macd: "Bullish",
      rsi: 58,
      movingAverages: "Buy"
    }
  },
  {
    id: 2,
    symbol: "TSLA",
    name: "Tesla, Inc.",
    action: "Hold",
    reason: "Market volatility and increased competition",
    confidence: 0.65,
    price: 650.75,
    change: -1.2,
    analysis: "While Tesla maintains a leading position in the EV market, increasing competition and production challenges pose risks. The company's innovation in battery technology and expansion into energy storage present long-term growth opportunities.",
    technicalIndicators: {
      macd: "Neutral",
      rsi: 45,
      movingAverages: "Neutral"
    }
  },
  {
    id: 3,
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    action: "Buy",
    reason: "Growing demand in AI and gaming sectors",
    confidence: 0.9,
    price: 280.30,
    change: 3.8,
    analysis: "NVIDIA's dominant position in the GPU market and its expanding role in AI and data center applications provide strong growth prospects. The company's involvement in emerging technologies like autonomous vehicles adds to its long-term potential.",
    technicalIndicators: {
      macd: "Bullish",
      rsi: 72,
      movingAverages: "Strong Buy"
    }
  },
]

export function AIRecommendations() {
  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{rec.symbol}</CardTitle>
                <p className="text-sm text-muted-foreground">{rec.name}</p>
              </div>
              <Badge variant={rec.action === "Buy" ? "default" : "secondary"}>
                {rec.action}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">AI Confidence:</span>
                <div className="bg-muted h-2 w-24 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${rec.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm ml-2">{(rec.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="text-right">
                <p className="font-bold">${rec.price.toFixed(2)}</p>
                <p className={rec.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {rec.change >= 0 ? (
                    <ArrowUpIcon className="inline mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="inline mr-1 h-4 w-4" />
                  )}
                  {Math.abs(rec.change).toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">{rec.analysis}</p>
              <div className="flex justify-between text-sm">
                <span>MACD: {rec.technicalIndicators.macd}</span>
                <span>RSI: {rec.technicalIndicators.rsi}</span>
                <span>Moving Averages: {rec.technicalIndicators.movingAverages}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

