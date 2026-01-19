import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Max PMS",
  description: "Max PMS is a Patient Management System.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
