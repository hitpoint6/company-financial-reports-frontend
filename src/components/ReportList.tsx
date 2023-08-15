import React, { useState, useEffect } from "react";
import { Report } from "../models/types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface Props {
  companyId: number;
  reportSubmitted: boolean;
}

const ReportList: React.FC<Props> = ({ companyId, reportSubmitted }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const host = process.env.REACT_APP_BACKEND_FETCH_HOST || "";

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch(
          `${host}/api/companies/${companyId}/reports/`
        );
        const data = await response.json();
        console.log(data);
        const sortedData = data.sort((a: Report, b: Report) => {
          return b.id - a.id;
        });

        setReports(sortedData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }

    fetchReports();
  }, [companyId, reportSubmitted]);

  const formatDate = (date: string | null): string => {
    if (date === null) {
      return "";
    }
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Reports for Company ID: {companyId}
      </Typography>
      <List>
        {reports.map((report) => (
          <ListItem key={report.id}>
            <ListItemText
              primary={`Report Id: ${report.id} - Reported on: ${formatDate(
                report.timestamp
              )}`}
              secondary={`Revenue: ${report.revenue || ""}, Cash Burn: ${
                report.cash_burn || ""
              }, Gross Profit: ${report.gross_profit || ""}, EBITDA: ${
                report.ebitda || ""
              }, Cash on Hand: ${report.cash_on_hand || ""}, CAC: ${
                report.cac || ""
              }, LTV: ${report.ltv || ""}, ACV: ${
                report.acv || ""
              }, Customer Count: ${
                report.customer_count || ""
              }, Next Fundraising: ${formatDate(report.next_fundraising)}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReportList;
