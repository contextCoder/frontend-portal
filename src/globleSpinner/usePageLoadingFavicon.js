import { useEffect } from "react";

export const usePageLoadingFavicon = (isLoading) => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (!favicon) return;

    if (isLoading) {
      favicon.href =
        "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 stroke=%22blue%22 stroke-width=%228%22 fill=%22none%22 stroke-dasharray=%22188%22 stroke-dashoffset=%22188%22><animate attributeName=%22stroke-dashoffset%22 values=%22188;0%22 dur=%222s%22 repeatCount=%22indefinite%22/></circle></svg>";
    } else {
      favicon.href = "/favicon.ico"; // reset to your default favicon
    }
  }, [isLoading]);
};
