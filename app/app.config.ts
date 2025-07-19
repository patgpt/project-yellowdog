export default defineAppConfig({
  title: "Yellowdog",
  navigation: [
    {
      label: "Home",
      to: "/",
      icon: "mdi-home",
    },
    {
      label: "Blog",
      to: "/blog",
      icon: "mdi-post",
    },
    {
      label: "Services",
      to: "/services",
      icon: "mdi-briefcase",
    },
    {
      label: "About",
      to: "/about",
      icon: "mdi-information",
    },
    {
      label: "Contact",
      to: "/contact",
      icon: "mdi-email",
    },
  ],
  description: "Yellowdog is a blog about the latest trends in technology.",
  footer: {
    description: "Yellowdog is a blog about the latest trends in technology.",
    copyright: "Copyright 2025",
    social: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/yellowdog",
      },
      {
        icon: "mdi-twitter",
        link: "https://www.twitter.com/yellowdog",
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/company/yellowdog",
      },
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/yellowdog",
      },
    ],
  },
});
