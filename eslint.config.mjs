import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    files: [
      "src/components/ui/**/*.{ts,tsx}",
      "src/components/shared/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/sections/**",
                "@/app/**",
                "@/site-schema/runtime/**",
                "@/site-schema/generated",
                "@/site-schema/generated/index*",
                "**/site-schema/generated/index*",
                "**/sections/**",
                "**/app/**",
                "**/site-schema/runtime/**",
              ],
              message:
                "Shared UI must not depend on Section, route, or runtime orchestration implementations. Pass data through props.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    files: ["tailwind.config.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
