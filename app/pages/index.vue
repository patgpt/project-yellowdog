<template>
  <div>
    <HeroSection
      heading="Welcome to Yellowdog"
      subheading="We are a team of developers who are passionate about building great software."
      image="logo.png"
      button-text="Contact Us"
      button-link="/contact"
      background-image="purple-texture.png"
    />

    <v-container ma-1>
      <ContentRenderer v-if="homePage" :value="homePage" />
      <NotFound v-else />
    </v-container>
  </div>
</template>

<script setup lang="ts">
const { data: homePage } = await useAsyncData("home-page", () =>
  queryCollection("pages").path("/").first(),
);
</script>
