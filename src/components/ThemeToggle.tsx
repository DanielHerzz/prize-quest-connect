
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sun, moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
    >
      {isDark ? (
        <sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <moon className="h-4 w-4 text-blue-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;
