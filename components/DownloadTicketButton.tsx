"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";

export default function DownloadTicketButton({
  fileName,
}: {
  fileName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const ticket = document.getElementById("ticket-container");
    if (!ticket) return;

    try {
      setLoading(true);

      const dataUrl = await htmlToImage.toJpeg(ticket, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#fff",
      });

      const link = document.createElement("a");
      link.download = `${fileName}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Image download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="
        w-full flex items-center justify-center gap-2
        bg-gradient-to-r from-blue-600 to-indigo-500
        text-white font-semibold rounded-full
        shadow-lg transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl active:scale-[.97]
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating Image...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Ticket
        </>
      )}
    </Button>
  );
}
