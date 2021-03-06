<template>
  <div id="app">
    <p>
      <router-link to="/home">Go to home</router-link>
      <router-link to="/about">Go to about</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
