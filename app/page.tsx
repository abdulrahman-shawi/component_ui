import { Plus, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { CustomersTable, type Customer } from "@/components/shared/customers-table";

const customers: Customer[] = [
  { id: "cus_1", name: "Ava Thompson", email: "ava.thompson@acme-corp.com", company: "Acme Corp", status: "active", totalSpent: 48200, lastActive: "2 hours ago", lastActiveAt: 1717452000000 },
  { id: "cus_2", name: "Marcus Reid", email: "marcus.reid@globex.com", company: "Globex", status: "active", totalSpent: 124500, lastActive: "Yesterday", lastActiveAt: 1717365600000 },
  { id: "cus_3", name: "Elena Vasquez", email: "elena.v@initech.io", company: "Initech", status: "pending", totalSpent: 12750, lastActive: "3 days ago", lastActiveAt: 1717168800000 },
  { id: "cus_4", name: "David Kim", email: "david.kim@umbrella.co", company: "Umbrella", status: "inactive", totalSpent: 8300, lastActive: "Last week", lastActiveAt: 1716840000000 },
  { id: "cus_5", name: "Sara Lindqvist", email: "sara.l@hooli.dev", company: "Hooli", status: "active", totalSpent: 96400, lastActive: "5 hours ago", lastActiveAt: 1717440000000 },
  { id: "cus_6", name: "James Carter", email: "j.carter@piedpiper.com", company: "Pied Piper", status: "churned", totalSpent: 21900, lastActive: "2 weeks ago", lastActiveAt: 1716235200000 },
  { id: "cus_7", name: "Priya Sharma", email: "priya@starkindustries.com", company: "Stark Industries", status: "active", totalSpent: 210000, lastActive: "1 hour ago", lastActiveAt: 1717459200000 },
  { id: "cus_8", name: "Tom Becker", email: "tom.b@wayneenterprises.com", company: "Wayne Enterprises", status: "pending", totalSpent: 4150, lastActive: "4 days ago", lastActiveAt: 1717084800000 },
  { id: "cus_9", name: "Nina Petrova", email: "nina.p@cyberdyne.net", company: "Cyberdyne", status: "inactive", totalSpent: 33800, lastActive: "Last month", lastActiveAt: 1714507200000 },
  { id: "cus_10", name: "Omar Haddad", email: "omar@vandelay.com", company: "Vandelay Industries", status: "active", totalSpent: 67900, lastActive: "6 hours ago", lastActiveAt: 1717432800000 },
  { id: "cus_11", name: "Lucy Chen", email: "lucy.chen@wonkalabs.com", company: "Wonka Labs", status: "active", totalSpent: 15400, lastActive: "Yesterday", lastActiveAt: 1717351200000 },
  { id: "cus_12", name: "Bruno Costa", email: "bruno@tyrellcorp.com", company: "Tyrell Corporation", status: "churned", totalSpent: 9700, lastActive: "3 weeks ago", lastActiveAt: 1715726400000 },
  { id: "cus_13", name: "Fatima Al-Sayed", email: "fatima@massivedynamic.com", company: "Massive Dynamic", status: "pending", totalSpent: 27300, lastActive: "2 days ago", lastActiveAt: 1717255200000 },
  { id: "cus_14", name: "George Miller", email: "george.m@gekkoco.com", company: "Gekko & Co", status: "active", totalSpent: 58100, lastActive: "3 hours ago", lastActiveAt: 1717446000000 },
  { id: "cus_15", name: "Anna Kowalski", email: "anna.k@abstergo.com", company: "Abstergo", status: "inactive", totalSpent: 6850, lastActive: "2 months ago", lastActiveAt: 1711924800000 },
  { id: "cus_16", name: "Liam O'Connor", email: "liam@soylent.com", company: "Soylent", status: "active", totalSpent: 83600, lastActive: "8 hours ago", lastActiveAt: 1717422000000 },
  { id: "cus_17", name: "Yuki Tanaka", email: "yuki.t@aperturelabs.com", company: "Aperture Labs", status: "pending", totalSpent: 19200, lastActive: "5 days ago", lastActiveAt: 1716998400000 },
  { id: "cus_18", name: "Rachel Green", email: "rachel.g@ocp.com", company: "OCP", status: "active", totalSpent: 102750, lastActive: "Just now", lastActiveAt: 1717462800000 },
];

async function handleAddCustomer() {
  "use server";
  console.log("[server action] add customer requested");
}

async function handleEditCustomer(customer: Customer) {
  "use server";
  console.log(`[server action] edit requested for ${customer.id} (${customer.name})`);
}

async function handleDeleteCustomer(customer: Customer) {
  "use server";
  console.log(`[server action] delete requested for ${customer.id} (${customer.name})`);
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="min-w-0 flex-1 p-4 pt-16 sm:p-6 sm:pt-16 lg:p-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Customers
              </h1>
              <p className="text-sm text-muted-foreground">
                View and manage your customer base, track engagement and spending.
              </p>
            </div>
            <Button onClick={handleAddCustomer}>
              <Plus className="h-4 w-4" />
              Add customer
            </Button>
          </header>
          <Alert variant="warning">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>3 customers pending review</AlertTitle>
            <AlertDescription>
              You have 3 pending customers that have not been assigned to an
              account manager yet.
            </AlertDescription>
          </Alert>
          <CustomersTable
            customers={customers}
            onAddCustomer={handleAddCustomer}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
          />
        </div>
      </main>
    </div>
  );
}
