"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStockData } from '@/utils/stock-data'

export function PortfolioRebalancing() {
  const stocks = useStockData()
  const [rebalanced, setRebalanced] = useState(false)

  const calculateTargetAllocation = () => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.price * stock.shares, 0)
    return stocks.map(stock => ({
      ...stock,
      currentAllocation: (stock.price * stock.shares / totalValue) * 100,
      targetAllocation: 100 / stocks.length, // Equal weight for simplicity
      difference: (100 / stocks.length) - ((stock.price * stock.shares / totalValue) * 100)
    }))
  }

  const [allocations, setAllocations] = useState(calculateTargetAllocation())

  const rebalancePortfolio = () => {
    const rebalancedAllocations = allocations.map(stock => ({
      ...stock,
      shares: Math.round((stock.targetAllocation / 100) * (stock.price * stock.shares) / stock.price)
    }))
    setAllocations(rebalancedAllocations)
    setRebalanced(true)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Portfolio Rebalancing</CardTitle>
        <CardDescription>Adjust your portfolio to maintain target allocations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Current Allocation</TableHead>
              <TableHead>Target Allocation</TableHead>
              <TableHead>Difference</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.currentAllocation.toFixed(2)}%</TableCell>
                <TableCell>{stock.targetAllocation.toFixed(2)}%</TableCell>
                <TableCell className={stock.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                  {stock.difference > 0 ? '+' : ''}{stock.difference.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {stock.difference > 1 ? 'Buy' : stock.difference < -1 ? 'Sell' : 'Hold'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={rebalancePortfolio} className="mt-4" disabled={rebalanced}>
          {rebalanced ? 'Portfolio Rebalanced' : 'Rebalance Portfolio'}
        </Button>
      </CardContent>
    </Card>
  )
}

