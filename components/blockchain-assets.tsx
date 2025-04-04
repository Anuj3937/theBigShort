"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const initialBlockchainAssets = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 2.5, value: 100000 },
  { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, value: 30000 },
  { id: 3, name: 'Cardano', symbol: 'ADA', quantity: 5000, value: 5000 },
  { id: 4, name: 'Polkadot', symbol: 'DOT', quantity: 1000, value: 20000 },
  { id: 5, name: 'Chainlink', symbol: 'LINK', quantity: 500, value: 7500 },
]

export function BlockchainAssets() {
  const [assets, setAssets] = useState(initialBlockchainAssets)

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets => 
        prevAssets.map(asset => ({
          ...asset,
          value: asset.value * (1 + (Math.random() - 0.5) * 0.02) // -1% to +1% change
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Blockchain Assets</CardTitle>
        <CardDescription>Real-time tracking of your cryptocurrency holdings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Value (USD)</TableHead>
              <TableHead>% of Portfolio</TableHead>
              <TableHead>24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => {
              const percentOfPortfolio = (asset.value / totalValue) * 100
              const dailyChange = (Math.random() - 0.5) * 10 // -5% to +5% change
              return (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                  </TableCell>
                  <TableCell>{asset.quantity.toFixed(4)}</TableCell>
                  <TableCell>${asset.value.toFixed(2)}</TableCell>
                  <TableCell>{percentOfPortfolio.toFixed(2)}%</TableCell>
                  <TableCell>
                    <Badge variant={dailyChange >= 0 ? "success" : "destructive"}>
                      {dailyChange >= 0 ? '+' : ''}{dailyChange.toFixed(2)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

