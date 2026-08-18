import { LayoutProps } from "@/types";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function DashboardLayout({
  children,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      
      {/* Fixed/Sticky Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />
        
        {/* Render Page Children */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}