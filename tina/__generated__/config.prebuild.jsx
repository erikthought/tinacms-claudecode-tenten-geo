// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true
          },
          {
            type: "string",
            name: "language",
            label: "Language",
            options: ["en", "ja", "zh-cn", "zh-tw", "ko", "ar"],
            required: true
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Hero Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Hero Subtitle",
                ui: {
                  component: "textarea"
                },
                required: true
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
                required: true
              },
              {
                type: "object",
                name: "stats",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "number",
                    label: "Stat Number",
                    required: true
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Stat Label",
                    required: true
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "problem",
            label: "Problem Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                required: true
              },
              {
                type: "object",
                name: "items",
                label: "Problem Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Item Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Item Description",
                    ui: {
                      component: "textarea"
                    },
                    required: true
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "solution",
            label: "Solution Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                required: true
              },
              {
                type: "object",
                name: "items",
                label: "Solution Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon (emoji)",
                    required: true
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Item Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Item Description",
                    ui: {
                      component: "textarea"
                    },
                    required: true
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "pricing",
            label: "Pricing Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                required: true
              },
              {
                type: "object",
                name: "plans",
                label: "Pricing Plans",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Plan Name",
                    required: true
                  },
                  {
                    type: "string",
                    name: "price",
                    label: "Price",
                    required: true
                  },
                  {
                    type: "string",
                    name: "period",
                    label: "Period (e.g., /month)",
                    required: true
                  },
                  {
                    type: "boolean",
                    name: "featured",
                    label: "Featured Plan"
                  },
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge Text"
                  },
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true,
                    required: true
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "CTA Button Text",
                    required: true
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "socialProof",
            label: "Social Proof Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                required: true
              },
              {
                type: "object",
                name: "stats",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "number",
                    label: "Stat Number",
                    required: true
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Stat Label",
                    required: true
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "finalCta",
            label: "Final CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Section Subtitle",
                required: true
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                required: true
              },
              {
                type: "string",
                name: "contactText",
                label: "Contact Button Text",
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
