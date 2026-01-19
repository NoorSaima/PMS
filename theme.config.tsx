
import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image';

const config: DocsThemeConfig = {
  logo: (
    <span className=" inline-flex gap-2.5 items-center">
      <div className="relative h-8 w-8">
        <Image src="/images/logo/ihc_logo.png" fill alt="Max PMS Logo" className="object-contain" />
      </div>
      <span className="  text-lg font-bold text-default ">Max PMS</span>
    </span>
  ),
  project: {
    link: "https://github.com/shuding/nextra",
  },
  banner: {
    key: "1.0-release",
    text: (
      <a href="/dashboard" target="_blank">
        🎉 Max PMS
      </a>
    ),
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{" "}
        <a href="https://codeshaper.net/" target="_blank">
          CodeShaper
        </a>
        .
      </span>
    ),
  },
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'System', // Add this line
      };
    },
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Max PMS",
    };
  },
};

export default config