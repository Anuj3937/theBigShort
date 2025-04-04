"use client"

import { useStockData } from '@/utils/stock-data'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

export function TopStocks() {
  const stocks = useStockData();

  return (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors">
          <div>
            <div className="font-medium">{stock.symbol}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">${stock.price.toFixed(2)}</div>
            <div className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stock.change >= 0 ? (
                <ArrowUpIcon className="inline mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="inline mr-1 h-4 w-4" />
              )}
              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

