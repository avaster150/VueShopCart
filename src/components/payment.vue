<template>
  <div class="payment-contener">
    <div v-if="!startPayment" class="payment-stop">
      <h1>Dodaj produkty do koszyka a następnie naciśnij "Zapłać i zamów"</h1>
      <router-link class="go-back" to="/"
        >Przejdź do strony głównej</router-link
      >
    </div>

    <div v-if="startPayment" class="payment-start">
      <div class="payment-header">
        <div class="logo">
          <h1><router-link to="/">LOGO</router-link></h1>
        </div>
      </div>

      <div class="payment-data">
        <paymentForm />
        <div class="cart-datas">
          <div class="cart-data">
            <div v-for="item in cart" class="payment-cart-item" :key="item.id">
              <img :src="item.product.image" alt="" />
              <div>
                <h3>{{ item.product.product_name }}</h3>
                <p>{{ item.quantity }}szt.</p>
              </div>
              <h4>{{ item.product.price }}</h4>
            </div>
            <div class="payment-price">
              <div class="payment-prices">
                <p>Wartość koszyka</p>
                <p>{{ cartItemPrice }}$</p>
              </div>
              <div class="payment-prices">
                <p>Dostawa</p>
                <p>{{ deliveryPrice }}$</p>
              </div>
              <div class="payment-prices">
                <p>Płatność</p>
                <p>{{ paymentPrice }}$</p>
              </div>
              <div class="payment-total">
                <p>Do zapłaty</p>
                <p>
                  {{
                    (totalPrice =
                      deliveryPrice + paymentPrice + Number(cartItemPrice))
                  }}$
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paymentForm from "../Form/paymentForm.vue";
export default {
  components: {
    paymentForm,
  },
  data() {
    return {
      totalPrice: 0,
    };
  },
  computed: {
    startPayment() {
      return this.$store.state.payment;
    },
    cart() {
      return this.$store.state.cart;
    },
    cartItemPrice() {
      return this.$store.getters.cartItemPrice;
    },
    deliveryPrice() {
      return this.$store.state.deliveryPrice;
    },
    paymentPrice() {
      return this.$store.state.paymentPrice;
    },
  },
};
</script>

<style>
.payment-stop {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: 0 auto;
  text-align: center;
  color: rgb(71, 71, 71);
}

.payment-stop h1 {
  margin-bottom: 20px;
}

.payment-start {
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 150%;
  background-color: white;
}

.payment-header {
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

.payment-data {
  display: flex;
  justify-content: space-around;
}

.personal-data {
  display: flex;
  flex-direction: column;
}
.radio-box {
  margin-top: 20px;
}
.radio-choose {
  margin-top: 10px;
  border: 1px solid rgb(121, 121, 121);
  border-radius: 8px;
  overflow: hidden;
}
.radio-choose-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(121, 121, 121);
  padding-left: 15px;
  width: 530px;
}
.radio-choose-item:nth-last-child(1) {
  border-bottom: none;
}
.radio-choose label {
  display: inline-block;
  width: 100%;
  padding: 15px 15px 15px 10px;
}

.radio-choose label span {
  color: rgb(121, 121, 121);
  font-size: 13px;
}

.data-box {
  margin-top: 20px;
}
.data-input {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.data-input-item {
  margin-bottom: 15px;
}

.data-input input {
  display: block;
  border: 1px solid rgb(121, 121, 121);
  border-radius: 20px;
  padding: 10px 15px;
  width: 500px;
}
.data-input label {
  color: rgb(100, 100, 100);
  margin-left: 14px;
  font-size: 14px;
}
.data-input input:focus {
  border: 1px solid black;
  border-radius: 20px;
  outline: none;
}

.data-input .checkbox-input {
  display: inline;
  width: 20px;
  padding: 0px 0px;
}

.error {
  color: red;
  font-size: 14px;
  margin-left: 10px;
}

.endButton {
  margin-top: 10px;
  margin-bottom: 50px;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 520px;
  width: 200px;
  background-color: rgb(23, 194, 23);
  transition: 0.2s;
}
.endButton:hover {
  background-color: rgb(19, 156, 19);
}

.cart-data {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(180, 180, 180);
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 50px;
}

.payment-cart-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: rgb(180, 180, 180) solid 1px;

  /* overflow: hidden; */
}
.payment-cart-item img {
  width: 80px;
  height: 100px;
  margin-right: 10px;
}

.payment-cart-item div {
  margin-right: 30px;
}

.payment-cart-item div h3 {
  font-size: 15px;
  font-weight: 400;
  width: 200px;
}

.payment-cart-item div p {
  margin-top: 10px;
  color: rgb(121, 121, 121);
  font-size: 13px;
}

.payment-price {
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  background-color: rgb(247, 247, 247);
}
.payment-prices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.payment-total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: rgb(180, 180, 180) solid 1px;
  font-weight: bold;
}
.cart-info {
  z-index: 100;
}

.end-payment {
  justify-content: center;
  padding: 10px;
  margin: 0;
}

.cartPay h2 {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
