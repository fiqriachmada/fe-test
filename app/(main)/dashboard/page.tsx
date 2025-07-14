// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";

// import { RecentSales } from "@/components/dashboard/recent-sales";
// import { Overview } from "@/components/dashboard/overview";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Typography className="text-sm font-medium">Total Revenue</Typography>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$340.5</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last months
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Typography className="text-sm font-medium">Subscriptions</Typography>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$642.39</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Typography className="text-sm font-medium">Sales</Typography>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$574.34</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Typography className="text-sm font-medium">Active Now</Typography>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <Typography>Overview</Typography>
          </CardHeader>
          <CardContent>
            {/* <Overview /> */}
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <Typography>Recent Sales</Typography>
          </CardHeader>
          <CardContent>
            {/* <RecentSales /> */}
          </CardContent>
        </Card>
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Typography>Overview</Typography>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <Typography>Recent Sales</Typography>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
