import AppShell from '@/components/layouts/AppShell'
import React from 'react'

export default function OrdersPage() {
  return (
    <AppShell>
      <div className="font-urbanist">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Order Page
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Welcome to your order page
        </p>
      </div>
    </AppShell>
  )
}
