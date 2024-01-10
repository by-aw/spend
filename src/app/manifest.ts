import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spend",
    short_name: "Spend",
    description:
      "Spend is a simple budgeting app that helps you track your spending and save money.",
    theme_color: "#00C3A0",
    background_color: "#000000",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/192x.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/384x.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/512x.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
