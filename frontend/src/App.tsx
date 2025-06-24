import React, { useState, useCallback, useMemo, useEffect } from "react";
import { toast, Toaster } from "sonner";

// custom hooks for storage
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSessionStorage } from "./hooks/useSessionStorage";

// ui components
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { BackgroundBeams } from "./components/ui/BackgroundBeams";
import { SparklesCore } from "./components/ui/SparklesCore";

// layout components
import { Header } from "./components/layout/Header";
import { EnhancedFooter } from "./components/layout/EnhancedFooter";

// section components
import { UrlShortener } from "./components/sections/UrlShortener";
import { Statistics } from "./components/sections/Statistics";
import { RecentUrls } from "./components/sections/RecentUrls";
import { Features } from "./components/sections/Features";

// types
interface UrlItem {
  id: string;
  original: string;
  short: string;
  clicks: number;
  created_at: string;
}

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // theme management with localStorage persistence
  const [isDark, setIsDark] = useLocalStorage("theme", false);

  // apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // session storage for urls
  const [urls, setUrls] = useSessionStorage<UrlItem[]>(
    "url_shortener_urls",
    []
  );

  // calculate stats
  const stats = useMemo(() => {
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
    const today = new Date().toDateString();
    const todayUrls = urls.filter(
      (url) => new Date(url.created_at).toDateString() === today
    ).length;

    return { totalUrls, totalClicks, todayUrls };
  }, [urls]);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark, setIsDark]);

  const shortenUrl = useCallback(async (): Promise<boolean> => {
    if (!url) {
      toast.error("Please enter a URL");
      return false;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/urls/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: url }),
      });

      if (response.ok) {
        const data = await response.json();
        const newShortUrl = `${window.location.origin}/${data.short_code}`;

        // Check if this URL already exists in our local storage
        const existingUrl = urls.find((u) => u.original === url);
        const isNewUrl = !existingUrl;

        const newUrl = {
          id: data.id.toString(),
          original: url,
          short: newShortUrl,
          clicks: existingUrl?.clicks || 0,
          created_at: existingUrl?.created_at || new Date().toISOString(),
        };

        if (isNewUrl) {
          setUrls((prev) => [newUrl, ...prev]);
          toast.success("URL shortened successfully!");
        } else {
          // Update the existing URL with the latest data from server
          setUrls((prev) => prev.map((u) => (u.original === url ? newUrl : u)));
          toast.info("URL already shortened! Here's your existing short link.");
        }

        setShortUrl(newShortUrl);
        setUrl("");
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to shorten URL");
        return false;
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [url, setUrls, urls]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  }, []);

  const openLink = useCallback(
    (urlToOpen: string) => {
      // update click count for this url
      setUrls((prev) =>
        prev.map((url) =>
          url.short === urlToOpen ? { ...url, clicks: url.clicks + 1 } : url
        )
      );

      // open the link in a new tab
      window.open(urlToOpen, "_blank");
    },
    [setUrls]
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        shortenUrl();
      }
    },
    [shortenUrl]
  );

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDark ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      <BackgroundBeams isDark={isDark} />
      <SparklesCore isDark={isDark} />
      <Toaster position="top-right" />

      {/* theme toggle */}
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* header */}
        <Header isDark={isDark} />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
            {/* url shortener */}
            <UrlShortener
              url={url}
              shortUrl={shortUrl}
              isLoading={isLoading}
              isDark={isDark}
              onUrlChange={handleUrlChange}
              onKeyPress={handleKeyPress}
              onShorten={shortenUrl}
              onCopy={copyToClipboard}
            />

            {/* statistics */}
            <Statistics stats={stats} isDark={isDark} />
          </div>

          {/* recent urls */}
          <RecentUrls
            urls={urls}
            isDark={isDark}
            onCopy={copyToClipboard}
            onOpenLink={openLink}
          />

          {/* features */}
          <Features isDark={isDark} />
        </div>

        {/* footer */}
        <EnhancedFooter isDark={isDark} />
      </div>
    </div>
  );
}

export default App;
