import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } from "@heroui/react";
import { ShieldCheck, FileText, ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Electro",
  description: "Terms and conditions governing the use of Electro online store services.",
};

export default function TermsPage() {
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
            <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Terms of Service
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Please read these terms carefully before accessing or using Electro&apos;s e-commerce platform and services.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                By accessing, browsing, or creating an account on Electro, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                User Accounts & Responsibilities
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                When you create an account on Electro, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your credentials and account activities.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-2">
                <li>You must be at least 18 years old or have parental consent to make purchases.</li>
                <li>You agree not to use the platform for any illegal or unauthorized purpose.</li>
                <li>Electro reserves the right to terminate accounts that violate platform policies.</li>
              </ul>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
                Orders & Payments
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                All prices listed on Electro are subject to change without notice. We reserve the right to refuse or cancel any order for reasons including availability, inaccuracies in product pricing or specifications, or suspected fraud.
              </p>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">4</span>
                Intellectual Property
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                The content, layout, logos, graphics, and software code on Electro are owned by or licensed to Electro and are protected by applicable intellectual property rights and copyright laws.
              </p>
            </section>

            <Separator className="bg-slate-200 dark:bg-gray-800" />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">5</span>
                Contact Information
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                If you have any questions regarding these Terms of Service, please contact our support team at{" "}
                <a href="mailto:support@electro.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  support@electro.com
                </a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
