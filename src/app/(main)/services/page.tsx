import React from "react";
import Link from "next/link";
import { Wrench, Shield, Zap, RefreshCw, Smartphone, Laptop, Cpu, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Our Services - Electro",
  description: "Explore our range of electronic warranty, repair, customization, and technical services.",
};

const SERVICES = [
  {
    icon: Laptop,
    title: "Device Diagnostics & Repair",
    desc: "Certified technician inspection and fast hardware/software repair services for laptops and PCs.",
  },
  {
    icon: Shield,
    title: "Extended Warranty & Protection",
    desc: "Comprehensive protection plans covering accidental damage, screen repairs, and component failures.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In & Upgrades",
    desc: "Trade in your old gadgets for immediate store credit and upgrade to the latest tech devices seamlessly.",
  },
  {
    icon: Zap,
    title: "Custom PC Building",
    desc: "Custom gaming rigs and workstation configurations designed and assembled by hardware specialists.",
  },
  {
    icon: Smartphone,
    title: "Mobile Phone Setup & Transfer",
    desc: "Hassle-free data migration, screen protector application, and device optimization.",
  },
  {
    icon: Cpu,
    title: "Enterprise IT Solutions",
    desc: "Bulk electronics sourcing, corporate workstation deployment, and dedicated account support.",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-semibold">Our Services</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full">
          What We Offer
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Comprehensive Tech Services & Solutions
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Beyond selling top-tier electronics, we provide end-to-end support, repairs, trade-ins, and enterprise solutions to keep your tech running at peak performance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
