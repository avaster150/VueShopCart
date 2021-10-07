<template>
  <div class="cart-info">
    <div class="modal-container">
      <div class="text end-payment">
        <h2>
          <i class="fas fa-check"></i> Dziękuje za zakupy w naszym sklepie
        </h2>
      </div>

      <div class="modal-button end-payment">
        <router-link @click.native="clear" to="/"
          ><i class="fas fa-chevron-left"></i>Wróć na stronę główną</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clear() {
      this.$store.dispatch("clear");
    },
  },
};
</script>

<style>
</style>
