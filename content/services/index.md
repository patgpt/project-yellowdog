---
title: "Our Services"
description: "Professional digital solutions tailored to your needs"
hero:
  heading: "Skills That Ship"
  subheading: "Your ally in code and creativity"
intro: "From concept to completion, we deliver digital experiences that drive results. Our team combines technical expertise with creative vision to bring your ideas to life."
services:
  - title: "Web Development"
    description: "Custom websites and web applications built with modern technologies"
    icon: "mdi-web"
    category: "Web"
    url: "/services/web-development"
  - title: "AI Solutions"
    description: "Intelligent automation and machine learning integrations"
    icon: "mdi-robot"
    category: "AI"
    url: "/services/ai-solutions"
  - title: "Game Development"
    description: "Interactive experiences across platforms and devices"
    icon: "mdi-gamepad-variant"
    category: "Game"
    url: "/services/game-development"
  - title: "Mobile Development"
    description: "Native and cross-platform mobile applications"
    icon: "mdi-cellphone"
    category: "Mobile"
    url: "/services/mobile-development"
  - title: "SEO & Marketing"
    description: "Digital marketing strategies that drive organic growth"
    icon: "mdi-chart-line"
    category: "SEO"
    url: "/services/seo-marketing"
  - title: "UX/UI Design"
    description: "User-centered design that converts visitors to customers"
    icon: "mdi-palette"
    category: "Marketing"
    url: "/services/ux-ui-design"
cta:
  - label: "Start Your Project"
    to: "/contact"
    variant: "elevated"
    color: "primary"
    size: "large"
  - label: "View Portfolio"
    to: "/portfolio"
    variant: "outlined"
    color: "secondary"
    size: "large"
---

# {{ hero.heading }}

_{{ hero.subheading }}_

{{ intro }}

## Services

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
  <div v-for="service in services" :key="service.title" class="service-card">
    <h3>{{ service.title }}</h3>
    <p>{{ service.description }}</p>
    <a :href="service.url">Learn More →</a>
  </div>
</div>
