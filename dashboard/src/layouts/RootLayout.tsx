import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <p>Header</p>
      <Outlet />
      <p>Footer</p>
    </div>
  );
}
