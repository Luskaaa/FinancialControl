"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

export default function AntdThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          colorInfo: "#2563eb",
          colorLink: "#2563eb",
          colorBorder: "#e2e8f0",
          colorTextBase: "#0f172a",
          borderRadius: 10,
          fontFamily: "var(--font-geist-sans)",
        },
        components: {
          Table: { headerBg: "#f8fafc", rowHoverBg: "#f1f5f9" },
          Modal: { borderRadiusLG: 14 },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
