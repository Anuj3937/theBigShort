"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentTrades } from "@/components/recent-trades"
import { TopStocks } from "@/components/top-stocks"
import { PortfolioValue } from "@/components/portfolio-value"
import { MarketOverview } from "@/components/market-overview"
import { NewsWidget } from "@/components/news-widget"
import { AIRecommendations } from "@/components/ai-recommendations"
import { PortfolioBreakdown } from "@/components/portfolio-breakdown"
import { TradingInterface } from "@/components/trading-interface"
import { RiskAssessment } from "@/components/risk-assessment"
import { MarketAnalysis } from "@/components/market-analysis"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { MarketSentiment } from "@/components/market-sentiment"
import { RiskManagement } from "@/components/risk-management"
import { InvestmentStrategy } from "@/components/investment-strategy"
import { BlockchainAssets } from "@/components/blockchain-assets"
import { PortfolioRebalancing } from "@/components/portfolio-rebalancing"
import { TaxLossHarvesting } from "@/components/tax-loss-harvesting"
import { ComplianceCheck } from "@/components/compliance-check"
import { OrderExecution } from "@/components/order-execution"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStockData } from '@/utils/stock-data'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'overview'
  const stocks = useStockData();

  const totalPortfolioValue = stocks.reduce((sum, stock) => sum + stock.price * stock.shares, 0);
  const todayGainLoss = stocks.reduce((sum, stock) => sum + stock.change * stock.shares, 0);
  const todayGainLossPercentage = (todayGainLoss / (totalPortfolioValue - todayGainLoss)) * 100;

  return (
    <Tabs value={tab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
        <TabsTrigger value="overview" asChild>
          <Link href="/">Overview</Link>
        </TabsTrigger>
        <TabsTrigger value="portfolio" asChild>
          <Link href="/?tab=portfolio">Portfolio</Link>
        </TabsTrigger>
        <TabsTrigger value="trading" asChild>
          <Link href="/?tab=trading">Trading</Link>
        </TabsTrigger>
        <TabsTrigger value="analysis" asChild>
          <Link href="/?tab=analysis">Analysis</Link>
        </TabsTrigger>
        <TabsTrigger value="risk" asChild>
          <Link href="/?tab=risk">Risk</Link>
        </TabsTrigger>
        <TabsTrigger value="strategy" asChild>
          <Link href="/?tab=strategy">Strategy</Link>
        </TabsTrigger>
        <TabsTrigger value="blockchain" asChild>
          <Link href="/?tab=blockchain">Blockchain</Link>
        </TabsTrigger>
        <TabsTrigger value="compliance" asChild>
          <Link href="/?tab=compliance">Compliance</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPortfolioValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {todayGainLossPercentage >= 0 ? '+' : '-'}
                {Math.abs(todayGainLossPercentage).toFixed(2)}% today
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Gain/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${todayGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {todayGainLoss >= 0 ? '+' : '-'}${Math.abs(todayGainLoss).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {todayGainLossPercentage >= 0 ? '+' : '-'}
                {Math.abs(todayGainLossPercentage).toFixed(2)}% today
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stocks.length}</div>
              <p className="text-xs text-muted-foreground">Across {stocks.length} stocks</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$542,708.57</div>
              <p className="text-xs text-muted-foreground">
                {((542708.57 / (totalPortfolioValue + 542708.57)) * 100).toFixed(2)}% of total assets
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Portfolio Value Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PortfolioValue />
            </CardContent>
          </Card>
          <Card className="col-span-3 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Live market indices and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketOverview />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Your last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTrades />
            </CardContent>
          </Card>
          <Card className="col-span-3 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Top Performing Stocks</CardTitle>
              <CardDescription>Based on your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <TopStocks />
            </CardContent>
          </Card>
        </div>
        <PredictiveAnalytics />
      </TabsContent>
      <TabsContent value="portfolio" className="space-y-4">
        <PortfolioBreakdown />
        <PortfolioRebalancing />
        <TaxLossHarvesting />
        <BlockchainAssets />
      </TabsContent>
      <TabsContent value="trading" className="space-y-4">
        <TradingInterface />
        <OrderExecution />
        <MarketSentiment />
      </TabsContent>
      <TabsContent value="analysis" className="space-y-4">
        <MarketAnalysis />
        <AIRecommendations />
      </TabsContent>
      <TabsContent value="risk" className="space-y-4">
        <RiskAssessment />
        <RiskManagement />
      </TabsContent>
      <TabsContent value="strategy" className="space-y-4">
        <InvestmentStrategy />
      </TabsContent>
      <TabsContent value="blockchain" className="space-y-4">
        <BlockchainAssets />
      </TabsContent>
      <TabsContent value="compliance" className="space-y-4">
        <ComplianceCheck />
      </TabsContent>
    </Tabs>
  )
}

