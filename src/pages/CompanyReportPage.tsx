import React, { useState } from "react";
import { Grid } from "@mui/material";
import ReportForm from "../components/ReportForm";
import ReportList from "../components/ReportList";
import { useParams } from "react-router-dom";

const CompanyReportPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const safeCompanyId = parseInt(companyId!);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <ReportList
            companyId={safeCompanyId}
            reportSubmitted={reportSubmitted}
          />
        </Grid>
        <Grid item xs={5}>
          <ReportForm
            companyId={safeCompanyId}
            onReportSubmit={() => setReportSubmitted(!reportSubmitted)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyReportPage;
