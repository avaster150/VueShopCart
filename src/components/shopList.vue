<template>
  <div class="list-container">
    <div
      class="list-item"
      v-for="(product, index) in products"
      :key="product.id"
    >
      <router-link
        @click="goToInfo(index)"
        :to="{ name: 'productCart', params: { id: index } }"
      >
        <img :src="product.image" alt="" />
        <h1>{{ product.product_name }}</h1>
      </router-link>
      <div class="item-bottom">
        <h4>{{ product.price }}</h4>
        <button @click="addToCart(index)" class="list-addToCart">
          <i class="fas fa-cart-plus"></i>
        </button>
      </div>
    </div>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: false,
      addTitle: "",
      addImg: "",
      addPrice: "",
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },

  mounted() {
    this.$store.dispatch("getProducts");
  },

  methods: {
    addToCart(id) {
      this.cartInfo = true;
      this.addTitle = this.$store.state.products[id].product_name;
      this.addImg = this.$store.state.products[id].image;
      this.addPrice = this.$store.state.products[id].price;
      this.$store.dispatch("addProductToCart", {
        product: this.products[id],
        quantity: 1,
      });
    },
    goToInfo(id) {
      console.log(id);
      this.$store.dispatch("goToInfo", id);
    },
  },
};
</script>

<style>
.list-container {
  position: relative;
  top: 150px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  padding: 0 100px;
}

.list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  margin-bottom: 20px;
  overflow: hidden;
  padding-top: 20px;
  padding: 20px 10px 10px 10px;
  border: 1px solid white;
  border-radius: 8px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
}

.list-item:hover {
  border: 1px solid rgb(177, 177, 177);
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px;
}

.list-item a {
  text-decoration: none;
  color: black;
}

.list-item img {
  width: 240px;
  height: 290px;
}

.list-item h1 {
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.item-bottom {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.item-bottom h4 {
  position: absolute;
  left: 5px;
}

.list-addToCart {
  position: relative;
  border: 1px solid rgb(17, 158, 0);
  background-color: transparent;
  color: rgb(17, 158, 0);
  transition: 0.2s;
  cursor: pointer;
  border-radius: 50%;
  padding: 17px;
  position: absolute;
  right: 0;
  opacity: 0;
}
.list-item:hover .list-addToCart {
  opacity: 1;
}
.list-addToCart i {
  position: absolute;
  top: 50%;
  left: 47%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  text-align: center;
}

.list-addToCart:hover {
  background-color: rgb(17, 158, 0);
  color: white;
}

.cart-info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  max-width: 700px;
  width: 550px;
  min-width: 550px;
  background-color: white;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 8px;
  overflow: hidden;
}
.text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(248, 248, 248);
  border-bottom: 1px solid rgb(199, 199, 199);
  text-align: left;
  padding: 10px;
  padding-left: 20px;
  margin-bottom: 10px;
}

.text .fa-times {
  display: inline-block;
  border-radius: 50%;
  padding: 5px 9px;
  color: rgb(120, 120, 120);
  font-size: 25px;
  cursor: pointer;
  transition: 0.2s;
}

.text .fa-times:hover {
  background-color: rgb(190, 190, 190);
  color: black;
}

.text h2 i {
  font-size: 20px;
  color: rgb(17, 158, 0);
}
.modal-info-box {
  display: flex;
  padding: 10px 20px;
  align-items: center;
}

.modal-img img {
  width: 80px;
  height: 100px;
  margin-right: 10px;
}

.modal-info h4 {
  margin-top: 10px;
  color: rgb(70, 70, 70);
}

.modal-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(245, 245, 245);
  padding: 10px 5px;
  border-top: 1px solid rgb(199, 199, 199);
}
.modal-button a {
  display: block;
  text-decoration: none;
  color: rgb(70, 70, 70);
  padding: 5px 10px;
  background-color: transparent;
  transition: 0.2s;
  font-size: 14px;
  transition: 0.2s;
}

.modal-button a:hover {
  color: rgb(12, 12, 12);
}

.modal-button .go-cart {
  display: block;
  background-color: rgb(17, 158, 0);
  border-radius: 512px;
  padding: 10px 20px;
  color: white;
}

.modal-button .go-cart:hover {
  background-color: rgb(13, 116, 2);
  color: white;
}

.fa-chevron-right {
  margin-left: 5px;
}
.fa-chevron-left {
  margin-right: 5px;
}
</style>
