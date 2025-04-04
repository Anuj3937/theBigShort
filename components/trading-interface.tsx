"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useStockData } from "@/utils/stock-data"

export function TradingInterface() {
  const stocks = useStockData()
  const [selectedStock, setSelectedStock] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [direction, setDirection] = useState("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [strikePrice, setStrikePrice] = useState("")
  const [trailingAmount, setTrailingAmount] = useState("")
  const [useMargin, setUseMargin] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order submitted:", {
      orderType,
      direction,
      selectedStock,
      quantity,
      price,
      stopPrice,
      expirationDate,
      strikePrice,
      trailingAmount,
      useMargin,
    })
    // Reset form
    setSelectedStock("")
    setOrderType("market")
    setDirection("buy")
    setQuantity("")
    setPrice("")
    setStopPrice("")
    setExpirationDate("")
    setStrikePrice("")
    setTrailingAmount("")
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Advanced Order Placement</CardTitle>
        <CardDescription>Execute sophisticated trades with various order types</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Select value={selectedStock} onValueChange={setSelectedStock}>
                <SelectTrigger id="stock">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  {stocks.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderType">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger id="orderType">
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="stop">Stop</SelectItem>
                  <SelectItem value="stop-limit">Stop Limit</SelectItem>
                  <SelectItem value="trailing-stop">Trailing Stop</SelectItem>
                  <SelectItem value="call-option">Call Option</SelectItem>
                  <SelectItem value="put-option">Put Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger id="direction">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  {(orderType === "call-option" || orderType === "put-option") && (
                    <>
                      <SelectItem value="buy-to-open">Buy to Open</SelectItem>
                      <SelectItem value="sell-to-open">Sell to Open</SelectItem>
                      <SelectItem value="buy-to-close">Buy to Close</SelectItem>
                      <SelectItem value="sell-to-close">Sell to Close</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          {(orderType === "limit" || orderType === "stop-limit") && (
            <div className="space-y-2">
              <Label htmlFor="price">Limit Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="Enter limit price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          )}
          {(orderType === "stop" || orderType === "stop-limit") && (
            <div className="space-y-2">
              <Label htmlFor="stopPrice">Stop Price</Label>
              <Input
                id="stopPrice"
                type="number"
                step="0.01"
                placeholder="Enter stop price"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
              />
            </div>
          )}
          {orderType === "trailing-stop" && (
            <div className="space-y-2">
              <Label htmlFor="trailingAmount">Trailing Amount</Label>
              <Input
                id="trailingAmount"
                type="number"
                step="0.01"
                placeholder="Enter trailing amount"
                value={trailingAmount}
                onChange={(e) => setTrailingAmount(e.target.value)}
              />
            </div>
          )}
          {(orderType === "call-option" || orderType === "put-option") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="strikePrice">Strike Price</Label>
                <Input
                  id="strikePrice"
                  type="number"
                  step="0.01"
                  placeholder="Enter strike price"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <Switch id="use-margin" checked={useMargin} onCheckedChange={setUseMargin} />
            <Label htmlFor="use-margin">Use Margin</Label>
          </div>
          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

