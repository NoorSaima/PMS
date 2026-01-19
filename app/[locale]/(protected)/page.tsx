import React from "react";
import { DashboardKpiCards } from "@/components/dashboard/dashboard-kpi-cards";
import ClaimsByStatusChart from "@/components/dashboard/claims-by-status-chart";
import PayerMixChart from "@/components/dashboard/payer-mix-chart";
import ClaimsAgingChart from "@/components/dashboard/claims-aging-chart";
import TopPayersVolumeChart from "@/components/dashboard/top-payers-volume-chart";
import TopPayersChargesChart from "@/components/dashboard/top-payers-charges-chart";
import TopPayersCptChart from "@/components/dashboard/top-payers-cpt-chart";
import ClaimsPatientsComparisonChart from "@/components/dashboard/claims-patients-comparison-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <DashboardKpiCards />

      {/* First Row - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Claims by Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ClaimsByStatusChart height={240} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Outstanding Claims Aging</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-0">
            <ClaimsAgingChart height={240} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Claims vs Patients Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pl-0">
            <ClaimsPatientsComparisonChart height={240} />
          </CardContent>
        </Card>
      </div>

      {/* Row 1: Payers Volume & Charges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Top 8 Payers by Volume (Encounters Billed)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <TopPayersVolumeChart height={280} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Top 8 Payers by Charges Entered</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <TopPayersChargesChart height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Trends & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Payer Mix By Month Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <PayerMixChart height={280} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Top 8 Payers CPT Code</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <TopPayersCptChart height={280} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
