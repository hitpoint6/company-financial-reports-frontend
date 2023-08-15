import React, { useState } from "react";
import { Report } from "../models/types";
import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";

interface Props {
  companyId: number;
  onReportSubmit: () => void;
}

const ReportForm: React.FC<Props> = ({ companyId, onReportSubmit }) => {
  const [revenue, setRevenue] = useState<string>("");
  const [cashBurn, setCashBurn] = useState<string>("");
  const [grossProfit, setGrossProft] = useState<string>("");
  const [ebitda, setEbitda] = useState<string>("");
  const [cashOnHand, setCashOnHand] = useState<string>("");
  const [cac, setCac] = useState<string>("");
  const [acv, setAcv] = useState<string>("");
  const [ltv, setLtv] = useState<string>("");
  const [customerCount, setCustomerCount] = useState<string>("");
  const [nextFundraising, setNextFundraising] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const host = process.env.REACT_APP_BACKEND_FETCH_HOST || "";
    setFormErrors({});

    const report: Report = {
      id: 0,
      company: companyId,
      revenue: parseFloat(revenue),
      cash_burn: parseFloat(cashBurn),
      gross_profit: parseFloat(grossProfit),
      ebitda: parseFloat(ebitda),
      cash_on_hand: parseFloat(cashOnHand),
      cac: parseFloat(cac),
      ltv: parseFloat(ltv),
      acv: parseFloat(acv),
      customer_count: parseInt(customerCount),
      next_fundraising: nextFundraising,
      timestamp: new Date().toISOString().split("T")[0], // e.g., "2023-08-14",
    };
    console.log(report);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${host}/api/reports/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      if (response.status === 400 || !response.ok) {
        const error = await response.json();
        setFormErrors(error);
        throw new Error("Bad request", error);
      }
      onReportSubmit();
      console.log("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setRevenue("");
      setCashBurn("");
      setGrossProft("");
      setEbitda("");
      setCashOnHand("");
      setCac("");
      setAcv("");
      setLtv("");
      setCustomerCount("");
      setNextFundraising(null);
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Add New Report
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Revenue ($ annualized)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Cash Burn ($ annualized)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cashBurn}
            onChange={(e) => setCashBurn(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Gross Profit (%)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={grossProfit}
            onChange={(e) => setGrossProft(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
              max: "100.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="EBITDA ($ annualized)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ebitda}
            onChange={(e) => setEbitda(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Cash on Hand ($)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cashOnHand}
            onChange={(e) => setCashOnHand(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Customer acquisition cost ($)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cac}
            onChange={(e) => setCac(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Loan to Value"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ltv}
            onChange={(e) => setLtv(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Annual Contract Value ($)"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={acv}
            onChange={(e) => setAcv(e.target.value)}
            inputProps={{
              step: "0.01",
              min: "0.0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Customer Count"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={customerCount}
            onChange={(e) => setCustomerCount(e.target.value)}
            inputProps={{
              step: "1",
              min: "0",
            }}
          />
        </div>
        <div>
          <TextField
            label="Next Fundraising"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nextFundraising || ""}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setNextFundraising(e.target.value)}
          />
        </div>
        {Object.keys(formErrors).map((field, i) => (
          <div key={i}>
            {formErrors[field].map((errorMessage, j) => (
              <Typography color="error">{errorMessage}</Typography>
            ))}
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit" size="large">
          {isSubmitting ? "Submitting...." : "Submit Report"}
        </Button>
      </form>
    </Container>
  );
};

export default ReportForm;
