export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
        Coming soon
      </div>
      <h1 className="font-display text-3xl font-semibold text-ink-900">{title}</h1>
      <p className="max-w-md text-sm text-ink-500">
        This workspace section is being prepared. We will ship analytics, reporting, and workflows here soon.
      </p>
    </div>
  );
}
