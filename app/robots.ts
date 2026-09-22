import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/user/",
        "/worker/",
        "/owner/",
        "/onboard",
        "/create-workspace",
        "/select-workspace",
        "/create-farm",
      ],
    },
    sitemap: "https://smart-farm-managementt.vercel.app/sitemap.xml",
  };
}
