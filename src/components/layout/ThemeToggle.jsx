import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/theme-provider.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden rounded-full border-white/60 dark:border-white/15 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/15"
          />
        }
      >
        <Sun className="scale-100 rotate-0 text-[#b5701b] transition-all duration-500 dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.15rem] w-[1.15rem] scale-0 rotate-90 text-[#A38DF0] transition-all duration-500 dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-36 rounded-2xl border border-white/60 dark:border-white/15 bg-white/90 dark:text-amber-50 dark:bg-[#211B3D]/95 backdrop-blur-lg p-1.5"
      >
        {["light", "dark", "system"].map((mode) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => setTheme(mode)}
            className="rounded-xl px-3 py-2 text-[14px] capitalize cursor-pointer focus:bg-background dark:focus:bg-white/10"
          >
            {mode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
