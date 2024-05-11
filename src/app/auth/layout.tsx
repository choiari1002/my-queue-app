import type { Metadata } from "next";

export const metadata: Metadata = {
//   title: "Create Next App",
};

const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
<>{children}</>
  );
};

export default AuthLayout;