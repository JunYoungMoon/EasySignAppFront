<template>
  <VApp>
    <VMain>
      <nav>
        <nuxt-link to="/">Home</nuxt-link> |
        <nuxt-link to="/blog">Blog</nuxt-link>
      </nav>
      <slot/>
    </VMain>
  </VApp>
</template>
