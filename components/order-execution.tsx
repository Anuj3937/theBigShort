"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStockData } from "@/utils/stock-data"

export function OrderExecution() {
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
  const [orders, setOrders] = useState([])

  const executeOrder = () => {
    const newOrder = {
      id: Date.now(),
      stock: selectedStock,
      type: orderType,
      direction: direction,
      quantity: Number.parseInt(quantity),
      price: price ? Number.parseFloat(price) : stocks.find((s) => s.symbol === selectedStock)?.price,
      stopPrice: stopPrice ? Number.parseFloat(stopPrice) : null,
      expirationDate: expirationDate || null,
      strikePrice: strikePrice ? Number.parseFloat(strikePrice) : null,
      trailingAmount: trailingAmount ? Number.parseFloat(trailingAmount) : null,
      status: "Pending",
    }
    setOrders([newOrder, ...orders])

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

    // Simulate order execution after 2 seconds
    setTimeout(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === newOrder.id ? { ...order, status: "Executed" } : order)),
      )
    }, 2000)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Order Execution</CardTitle>
        <CardDescription>Place and monitor your trade orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
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
                <SelectValue placeholder="Order type" />
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
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {(orderType === "limit" || orderType === "stop-limit") && (
            <div className="space-y-2">
              <Label htmlFor="price">Limit Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="Limit Price"
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
                placeholder="Stop Price"
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
                placeholder="Trailing Amount"
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
                  placeholder="Strike Price"
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
        </div>
        <Button onClick={executeOrder} className="w-full mb-4">
          Execute Order
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.stock}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.direction}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.price.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

