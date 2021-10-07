<template>
  <header>
    <div class="logo">
      <h1><router-link to="/">LOGO</router-link></h1>
    </div>
    <div class="header-menu">
      <ul>
        <li><router-link to="/">Strona główna</router-link></li>
      </ul>
    </div>
    <div class="shop-card">
      <router-link to="/cart"
        ><i class="fas fa-shopping-cart"></i> ({{ cartItemCount }})</router-link
      >
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
  },
};
</script>

<style>
header {
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  z-index: 2;
  border-bottom: rgb(182, 182, 182) 1px solid;
  margin-bottom: 50px;
  width: 100%;
  height: 88px;
  min-width: 550px;
}

.logo {
  margin-left: 70px;
  margin-right: 55px;
}

.logo h1 {
  text-align: left;
}

.logo h1 a {
  color: black;
  text-decoration: none;
  font-weight: 300;
}

.header-menu ul {
  display: flex;
  list-style: none;
}

.header-menu li {
  margin-left: 20px;
  color: rgb(121, 121, 121);
  transition: 0.2s;
  cursor: pointer;
}

.header-menu li:hover {
  color: black;
}

.header-menu a {
  display: inline-block;
  border-right: 1px solid black;
  padding-right: 20px;
  color: rgb(121, 121, 121);
  text-decoration: none;
  transition: 0.2s;
}

.header-menu a:hover {
  color: black;
}

.header-menu .router-link-exact-active {
  color: black;
}

.shop-card {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.shop-card a {
  color: black;
  display: block;
  text-decoration: none;
  transition: 0.2s;
  padding: 16px 20px;
  background-color: white;
}

.shop-card .router-link-active {
  color: white;
  background-color: black;
}
</style>
