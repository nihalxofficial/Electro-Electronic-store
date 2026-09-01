"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { getUserSession } from "@/lib/core/session";

type SessionUser = Awaited<ReturnType<typeof getUserSession>>;

interface AccountButtonProps {
  className?: string;
  onClick?: () => void;
  showLabel?: boolean;
}

export default function AccountButton({
  className = "",
  onClick,
  showLabel = true,
}: AccountButtonProps) {
  const [user, setUser] = useState<SessionUser>(null);

  useEffect(() => {
    getUserSession()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const href = user
    ? user.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer"
    : "/auth/login";

  const label = user?.name?.split(" ")[0] ?? "My Account";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="My Account"
      className={`group flex items-center gap-1.5 hover:text-primary dark:hover:text-primary transition-colors duration-150 ${className}`}
    >
      <User className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-150 shrink-0" />
      {showLabel && <span>{label}</span>}
    </Link>
  );
}