<template>
  <div class="single-product-container">
    <div v-if="cartInfo" class="cart-info">
      <div class="modal-container">
        <div class="text">
          <h2><i class="fas fa-check"></i> Produkt dodany do koszyka</h2>
          <i @click="cartInfo = false" class="fas fa-times"></i>
        </div>
        <div class="modal-info-box">
          <div class="modal-img">
            <img :src="addImg" alt="" />
          </div>
          <div class="modal-info">
            <h3>{{ addTitle }}</h3>
            <h4>{{ addPrice }}</h4>
          </div>
        </div>
        <div class="modal-button">
          <router-link @click.native="cartInfo = false" to="/"
            ><i class="fas fa-chevron-left"></i>Wróć do zakupów</router-link
          >
          <router-link
            class="go-cart"
            @click.native="cartInfo = false"
            to="/cart"
            >Przejdz do koszyka<i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="id < product.length" class="new-product-container">
      <div class="singe-img"><img :src="product[id].image" alt="" /></div>
      <div class="single-product">
        <h1>{{ product[id].product_name }}</h1>
        <h2>Firma: {{ product[id].company }}</h2>
        <p><span>Opis:</span> {{ product[id].description }}</p>
        <div class="single-info">
          <h3>Cena: {{ product[id].price }}</h3>
          <button @click="addToCart(id)">
            <i class="fas fa-cart-plus"></i> DODAJ DO KOSZYKA
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="id > product.length - 1 || typeof id !== 'number'"
      class="no-product"
    >
      <div class="error-page">
        <h1><i class="fas fa-exclamation-triangle"></i> 404</h1>
        <h2>Oops... Page Not Found</h2>
        <router-link class="go-back" to="/"
          >Przejdź do strony głównej</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      cartInfo: false,
      addTitle: "",
      addImg: "",
      addPrice: "",
    };
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  mounted() {
    this.$store.dispatch("getProduct", this.id);
  },
  methods: {
    addToCart(id) {
      console.log(typeof this.id);
      this.cartInfo = true;
      this.addTitle = this.$store.state.products[id].product_name;
      this.addImg = this.$store.state.products[id].image;
      this.addPrice = this.$store.state.products[id].price;
      this.$store.dispatch("addProductToCart", {
        product: this.product[id],
        quantity: 1,
      });
    },
  },
};
</script>
<style>
.no-product {
  margin: 0 auto;
  position: relative;
}
.single-product-container {
  position: relative;
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 200px;
  max-width: 1200px;
  min-width: 560px;
}
.single-product {
  margin-left: 15px;
  padding: 50px 50px;
  border: 1px solid rgb(90, 90, 90);
  border-radius: 8px;
  overflow: hidden;
}
.single-product h1 {
  margin-bottom: 10px;
  letter-spacing: 2px;
}
.single-product h2 {
  margin-bottom: 10px;
}
.single-product p {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: justify;
  padding-right: 10px;
  letter-spacing: 0.5px;
}

.single-product p span {
  font-weight: bold;
}

.single-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.single-product button {
  font-size: 15px;
  margin-top: 10px;
  margin-left: -1px;
  border: none;
  background-color: rgb(17, 158, 0);
  border-radius: 512px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
}
.single-product button .fas {
  font-size: 18px;
}

.single-product button:hover {
  background-color: rgb(13, 116, 2);
  color: white;
}
.new-product-container {
  display: flex;
  padding: 0 20px;
}
</style>
