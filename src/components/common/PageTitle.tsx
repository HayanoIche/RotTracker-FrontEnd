interface PageTitleProps {
    title: string;
    subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <header className="text-center py-8 space-y-3">
            <h1 className="font-title text-5xl md:text-7xl font-bold text-[var(--text-bold)] break-words">
                {title}
            </h1>
            {subtitle && (
                <p className="mx-auto max-w-2xl text-balance font-text text-xl font-bold text-[var(--text-main)]">
                    {subtitle}
                </p>
            )}
        </header>
    );
}