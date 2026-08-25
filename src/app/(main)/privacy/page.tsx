import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } from "@heroui/react";
import { ShieldCheck, Lock, ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Electro",
  description: "Learn how Electro collects, protects, and handles your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb / Back link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Last updated: August 2026
          </div>
        </div>

        {/* Page Hero Card */}
        <Card className="border border-slate-200/80 dark:border-gray-800 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl">
          <CardHeader className="flex flex-col gap-2 p-8 text-center border-b border-slate-100 dark:border-gray-800">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Your privacy is paramount. Discover how Electro collects, uses, and safeguards your information.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                Information We Collect
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We collect personal details that you provide directly to us when creating an account, updating your profile, placing orders, or contacting our support team.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-2">
                <li>Personal identification details (Name, Email address, Profile avatar).</li>
                <li>Billing and delivery details required for order processing.</li>
                <li>Technical metadata (Browser type, device info, session logs).</li>
              </ul>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                How We Use Your Information
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                We use the information collected to fulfill orders, facilitate account login, personalize your shopping experience, communicate updates, and secure our system against fraudulent activities.
              </p>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                Data Security & Sharing
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Electro employs industry-standard encryption protocols and secure server infrastructure to protect your personal data. We never sell your personal information to third parties.
              </p>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                Your Privacy Rights
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                You have the right to request access to, update, or delete your personal data stored on Electro at any time through your account settings or by contacting privacy support.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
