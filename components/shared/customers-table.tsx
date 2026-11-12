"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";

export type CustomerStatus = "active" | "pending" | "inactive" | "churned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  totalSpent: number;
  lastActive: string;
  lastActiveAt: number;
}

const statusConfig: Record<CustomerStatus, { label: string; variant: BadgeVariant }> = {
  active: { label: "Active", variant: "success" },
  pending: { label: "Pending", variant: "secondary" },
  inactive: { label: "Inactive", variant: "outline" },
  churned: { label: "Churned", variant: "destructive" },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function CustomerIdentityCell({ name, email }: { name: string; email: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {initials}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium text-foreground">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
}

export interface CustomersTableProps {
  customers: Customer[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onAddCustomer?: () => void;
  onEditCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customer: Customer) => void;
  onSelectionChange?: (customers: Customer[]) => void;
}

export function CustomersTable({
  customers,
  isLoading = false,
  error = null,
  onRetry,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onSelectionChange,
}: CustomersTableProps) {
  const showActions = Boolean(onEditCustomer || onDeleteCustomer);

  const columns = React.useMemo<ColumnDef<Customer>[]>(() => {
    const cols: ColumnDef<Customer>[] = [
      {
        id: "customer",
        header: "Customer",
        accessorKey: "name",
        sortable: true,
        cell: (row) => <CustomerIdentityCell name={row.name} email={row.email} />,
      },
      {
        id: "company",
        header: "Company",
        accessorKey: "company",
        sortable: true,
        cell: (row) => <span className="text-muted-foreground">{row.company}</span>,
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (row) => (
          <Badge variant={statusConfig[row.status].variant}>
            {statusConfig[row.status].label}
          </Badge>
        ),
      },
      {
        id: "totalSpent",
        header: "Total spent",
        accessorKey: "totalSpent",
        sortable: true,
        align: "right",
        cell: (row) => (
          <span className="font-medium tabular-nums text-foreground">
            {currencyFormatter.format(row.totalSpent)}
          </span>
        ),
      },
      {
        id: "lastActive",
        header: "Last active",
        accessorKey: "lastActive",
        sortable: true,
        sortValue: (row) => row.lastActiveAt,
        cell: (row) => (
          <span className="text-muted-foreground">{row.lastActive}</span>
        ),
      },
    ];

    if (showActions) {
      cols.push({
        id: "actions",
        header: "",
        align: "right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-1">
            {onEditCustomer && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEditCustomer(row)}
                aria-label={`Edit ${row.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDeleteCustomer && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onDeleteCustomer(row)}
                aria-label={`Delete ${row.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ),
      });
    }

    return cols;
  }, [onEditCustomer, onDeleteCustomer, showActions]);

  return (
    <DataTable
      data={customers}
      columns={columns}
      getRowId={(row) => row.id}
      searchable
      searchPlaceholder="Search customers..."
      selectable
      onSelectionChange={onSelectionChange}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      pageSize={8}
      emptyState={{
        title: "No customers found",
        description: "Try a different search term, or add your first customer.",
        actionLabel: "Add customer",
        onAction: onAddCustomer,
      }}
    />
  );
}
