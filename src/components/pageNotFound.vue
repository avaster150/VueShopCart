<template>
  <div class="error-page">
    <h1><i class="fas fa-exclamation-triangle"></i> 404</h1>
    <h2>Oops... Page Not Found</h2>
    <router-link class="go-back" to="/">Przejdź do strony głównej</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.error-page {
  margin: 0 auto;
  position: relative;
  top: 250px;
  text-align: center;
}
.error-page h1 {
  font-size: 50px;
  color: rgb(0, 130, 250);
}
.error-page h2 {
  font-size: 30px;
  color: rgb(90, 90, 90);
  margin-bottom: 30px;
}
</style>
