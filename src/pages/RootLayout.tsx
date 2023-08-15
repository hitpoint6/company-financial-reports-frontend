import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
