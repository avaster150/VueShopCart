<template>
  <div class="cart-container">
    <h2 v-if="cart.length === 0">Twój koszyk jest pusty.</h2>

    <router-link class="go-back" v-if="cart.length === 0" to="/"
      >Przejdź do strony głównej</router-link
    >
    <h2 v-if="cart.length > 0">
      Ilośc produktów w koszyku: {{ cartItemCount }}
    </h2>
    <div v-if="cart.length" class="cart-item-border">
      <div class="cart-item" v-for="(item, index) in cart" :key="item.id">
        <img :src="item.product.image" alt="" />
        <h1>{{ item.product.product_name }}</h1>
        <span @click="sub(index)" class="sub">-</span>
        <h4>
          {{ item.quantity }} x
          {{ item.product.price }}
        </h4>

        <span @click="add(index)" class="add">+</span>
        <button @click.prevent="removeItem(index)">Usuń produkt</button>
      </div>
    </div>
    <div v-if="cart.length > 0" class="totalPrice">
      Do zapłaty: {{ cartItemPrice }}$
    </div>
    <div v-if="cart.length > 0" class="pay-box">
      <router-link @click.native="pay" to="/payment"
        ><i class="fas fa-shopping-cart"></i> Zapłać i zamów</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
    cartItemPrice() {
      if (this.$store.getters.cartItemPrice === 0) return;
      return this.$store.getters.cartItemPrice;
    },
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch("removeItem", id);
    },
    add(id) {
      this.$store.dispatch("add", id);
    },
    sub(id) {
      this.$store.dispatch("sub", id);
    },
    pay() {
      this.$store.dispatch("pay");
    },
  },
};
</script>

<style>
.cart-container {
  position: relative;
  top: 150px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
  max-width: 1200px;
  padding: 0 100px;
  min-width: 560px;
}

.cart-container h2 {
  text-align: center;
  margin-bottom: 10px;
}

.go-back {
  display: block;
  margin: 10px auto 0 auto;
  width: 190px;
  text-align: center;
  padding: 10px 40px;
  border-radius: 520px;
  text-decoration: none;
  color: white;
  background-color: rgb(0, 130, 250);
  transition: 0.2s;
}

.go-back:hover {
  background-color: rgb(1, 106, 204);
}
.cart-item-border {
  border: 1px solid rgb(121, 121, 121);
  border-radius: 8px;
  overflow: hidden;
}
.cart-item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgb(121, 121, 121);
  min-width: 600px;
  padding: 15px 20px;
}
.cart-item:nth-last-child(1) {
  border-bottom: none;
}

.cart-item img {
  width: 80px;
  height: 100px;
  margin-right: 20px;
}
.cart-item h1 {
  font-size: 16px;
  margin-right: 20px;
  width: 200px;
}

.cart-item h4 {
  min-width: 70px;
  margin-left: 5px;
  margin-right: 5px;
}
.cart-item span {
  border: 1px solid rgb(121, 121, 121);
  padding: 2px 10px;
  margin-right: 5px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.cart-item span:hover {
  background-color: black;
  color: white;
}

.cart-item button {
  background-color: transparent;
  border: 1px solid rgb(121, 121, 121);
  color: black;
  padding: 5px 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  transition: 0.2s;
  cursor: pointer;
}

.cart-item button:hover {
  background-color: red;
  color: white;
}
.totalPrice {
  margin-top: 20px;
  text-align: right;
  margin-right: 5px;
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 20px;
}

.pay-box {
  display: flex;
  justify-content: flex-end;
}
.pay-box a {
  text-decoration: none;
  display: block;
  background-color: rgb(17, 158, 0);
  border-radius: 512px;
  padding: 10px 20px;
  color: white;
  margin-bottom: 50px;
}

.pay-box a:hover {
  background-color: rgb(13, 116, 2);
  color: white;
}
</style>
