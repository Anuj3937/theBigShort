"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStockData } from '@/utils/stock-data'

export function ComplianceCheck() {
  const stocks = useStockData()
  const [complianceChecked, setComplianceChecked] = useState(false)

  const checkCompliance = () => {
    // In a real application, this would perform actual compliance checks
    setComplianceChecked(true)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Compliance Check</CardTitle>
        <CardDescription>Ensure your portfolio adheres to regulatory requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compliance Check</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Insider Trading</TableCell>
              <TableCell>{complianceChecked ? 'Passed' : 'Pending'}</TableCell>
              <TableCell>No suspicious activity detected</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Market Manipulation</TableCell>
              <TableCell>{complianceChecked ? 'Passed' : 'Pending'}</TableCell>
              <TableCell>No unusual trading patterns found</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KYC/AML</TableCell>
              <TableCell>{complianceChecked ? 'Passed' : 'Pending'}</TableCell>
              <TableCell>Customer information up to date</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Position Limits</TableCell>
              <TableCell>{complianceChecked ? 'Passed' : 'Pending'}</TableCell>
              <TableCell>All positions within allowed limits</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={checkCompliance} className="mt-4" disabled={complianceChecked}>
          {complianceChecked ? 'Compliance Checked' : 'Run Compliance Check'}
        </Button>
      </CardContent>
    </Card>
  )
}

