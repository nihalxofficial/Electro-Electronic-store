export default function ProductDetailsLoading() {
  return (
    <div className="w-full py-6 space-y-8 animate-pulse relative">
      {/* Subtle ambient bluish gradient in dark mode */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Breadcrumb Navigation Skeleton */}
      <div className="flex items-center gap-2 text-xs">
        <div className="h-3.5 w-10 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3 w-3 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3.5 w-10 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3 w-3 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3.5 w-20 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3 w-3 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3.5 w-32 bg-gray-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Images Skeleton (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Hero Image Box */}
          <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/40 border border-sky-100 dark:border-sky-900/40 p-6 flex items-center justify-center shadow-xs">
            <div className="w-48 h-48 rounded-2xl bg-gray-100 dark:bg-slate-800/80" />
          </div>

          {/* Thumbnail Carousel Skeleton */}
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="w-20 h-20 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/40 shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Meta & Options Skeleton (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Meta */}
          <div className="space-y-3 border-b border-sky-100 dark:border-sky-900/40 pb-5">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-sky-200/70 dark:bg-sky-950/70 rounded-md" />
              <div className="h-3.5 w-20 bg-gray-200 dark:bg-slate-800 rounded-md" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-7 w-4/5 bg-gray-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-7 w-2/5 bg-gray-200 dark:bg-slate-800 rounded-lg" />
            </div>

            {/* Rating & Stock Status */}
            <div className="flex items-center gap-4 pt-1">
              <div className="h-4 w-32 bg-amber-100 dark:bg-amber-950/60 rounded-md" />
              <div className="h-4 w-2 bg-gray-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-24 bg-emerald-100 dark:bg-emerald-950/60 rounded-full" />
            </div>
          </div>

          {/* Price Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50/90 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-sky-950/40 dark:to-slate-900 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between shadow-xs">
            <div className="space-y-1.5">
              <div className="h-3 w-16 bg-gray-200 dark:bg-slate-800 rounded-md" />
              <div className="h-8 w-28 bg-gray-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="h-7 w-28 bg-amber-100 dark:bg-amber-950/60 rounded-xl" />
          </div>

          {/* Quick Description */}
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-gray-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3.5 w-5/6 bg-gray-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3.5 w-4/6 bg-gray-200 dark:bg-slate-800 rounded-md" />
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="h-12 w-full sm:w-36 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60" />
              <div className="h-12 flex-1 rounded-xl bg-gradient-to-r from-sky-500/70 to-blue-600/70 dark:from-sky-900/60 dark:to-blue-900/60" />
              <div className="h-12 w-full sm:w-32 rounded-xl bg-gray-100 dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60" />
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-4 pt-2 border-t border-sky-100 dark:border-sky-900/40">
              <div className="h-3.5 w-24 bg-gray-200 dark:bg-slate-800 rounded-md" />
              <div className="h-3.5 w-24 bg-gray-200 dark:bg-slate-800 rounded-md" />
              <div className="h-3.5 w-16 bg-gray-200 dark:bg-slate-800 rounded-md ml-auto" />
            </div>
          </div>

          {/* Store Features / Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-sky-100 dark:border-sky-900/40 flex flex-col items-center space-y-2"
              >
                <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/60" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-slate-800 rounded-md" />
                <div className="h-2.5 w-20 bg-gray-200 dark:bg-slate-800 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed Section Skeleton */}
      <div className="border border-sky-100 dark:border-sky-900/40 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex gap-6 border-b border-sky-100 dark:border-sky-900/40 pb-4">
          <div className="h-4 w-24 bg-sky-200/80 dark:bg-sky-950/80 rounded-md" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-36 bg-gray-200 dark:bg-slate-800 rounded-md" />
        </div>

        <div className="space-y-3 py-2">
          <div className="h-4 w-40 bg-gray-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3.5 w-full bg-gray-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3.5 w-5/6 bg-gray-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3.5 w-3/4 bg-gray-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>
    </div>
  );
}
