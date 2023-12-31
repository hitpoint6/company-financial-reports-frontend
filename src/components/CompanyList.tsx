import React, { useState, useEffect } from "react";
import { Company } from "../models/types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const host = process.env.REACT_APP_BACKEND_FETCH_HOST || "";
  const [isloadded, setIsloadded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch(`${host}/api/companies/`);
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setError("Error fetching companies");
        console.error("Error fetching companies:", error);
      } finally {
        setIsloadded(true);
      }
    }
    fetchCompanies();
  }, [host]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {!isloadded && <Typography>Loading...</Typography>}
      <List>
        {companies.map((company) => (
          <ListItem
            key={company.id}
            component="a"
            href={`/companies/${company.id}`}
          >
            <ListItemText
              primary={company.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Industry: {company.industry}, Location:
                    {company.location}, Business Model:
                    {company.business_model}, Feature Set: {company.feature_set}
                    , Founder Quality: {company.founder_quality}
                  </Typography>
                </>
              }
            />{" "}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CompanyList;
