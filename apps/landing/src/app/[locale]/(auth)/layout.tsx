/**
 * Auth route group layout.
 * This is a nested layout inside [locale]/layout.tsx, so it must NOT
 * render its own <html> or <body> tags.
 */
export default function AuthGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}