"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStockData } from '@/utils/stock-data'

export function TaxLossHarvesting() {
  const stocks = useStockData()
  const [harvestingComplete, setHarvestingComplete] = useState(false)

  const calculateTaxLoss = () => {
    return stocks.map(stock => ({
      ...stock,
      costBasis: stock.price * 1.1, // Assume bought at 10% higher price
      potentialLoss: (stock.price - stock.price * 1.1) * stock.shares,
      harvestable: (stock.price - stock.price * 1.1) * stock.shares < 0
    }))
  }

  const [taxLossOpportunities, setTaxLossOpportunities] = useState(calculateTaxLoss())

  const harvestTaxLosses = () => {
    // In a real application, this would trigger sell orders for harvestable stocks
    setHarvestingComplete(true)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Tax-Loss Harvesting</CardTitle>
        <CardDescription>Optimize your tax liability by harvesting losses</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Cost Basis</TableHead>
              <TableHead>Potential Loss</TableHead>
              <TableHead>Harvestable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxLossOpportunities.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell>${stock.costBasis.toFixed(2)}</TableCell>
                <TableCell className={stock.potentialLoss < 0 ? 'text-red-600' : 'text-green-600'}>
                  ${stock.potentialLoss.toFixed(2)}
                </TableCell>
                <TableCell>{stock.harvestable ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={harvestTaxLosses} className="mt-4" disabled={harvestingComplete}>
          {harvestingComplete ? 'Harvesting Complete' : 'Harvest Tax Losses'}
        </Button>
      </CardContent>
    </Card>
  )
}

