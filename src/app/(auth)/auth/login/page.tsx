import React from "react";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign In | Electro",
  description: "Sign in to your account to access your Electro dashboard and store settings.",
};

export default function LoginPage() {
  return <LoginForm />;
}
