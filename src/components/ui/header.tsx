import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "@/context/theme-provider";

export function Header() {
    const { theme } = useTheme();

    const isDark =
        theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <img
                    src={isDark ? "/husky-dark-logo.png" : "/husky-light-logo.png"}
                    alt="Lusky logo"
                    className="h-42"
                />


                <div className="flex gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}