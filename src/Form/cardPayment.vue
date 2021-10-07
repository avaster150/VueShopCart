<template>
  <div class="cartPay">
    <h2>4. Dane karty</h2>
    <div class="data-input-item">
      <label for="cartNumber">Numer karty*</label>
      <input
        type="text"
        placeholder="Numer karty"
        name="cartNumber"
        id="cartNumber"
        v-mask="'################'"
        v-model="cartNumber.cartNumberValue"
        @change="errorInfo"
      />
      <p v-if="cartNumber.error" class="error">
        {{ cartNumber.errorMessage }}
      </p>
    </div>
    <div class="data-input-item">
      <label for="cartDate">Data ważności karty*</label>
      <input
        type="text"
        placeholder="Data ważności karty"
        name="cartDate"
        id="cartDate"
        v-mask="'##/####'"
        v-model="cartDate.cartDateValue"
        @change="errorInfo"
      />
      <p v-if="cartDate.error" class="error">
        {{ cartDate.errorMessage }}
      </p>
    </div>
    <div class="data-input-item">
      <label for="cartControlNumber">Numer kontrolny karty*</label>
      <input
        type="text"
        placeholder="Numer kontrolny karty"
        name="cartControlNumber"
        id="cartControlNumber"
        v-mask="'###'"
        v-model="cartControlNumber.cartControlNumberValue"
        @change="errorInfo"
      />
      <p v-if="cartControlNumber.error" class="error">
        {{ cartControlNumber.errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartNumber: {
        cartNumberValue: "",
        error: true,
        errorMessage: "Proszę podać numer karty",
      },
      cartDate: {
        cartDateValue: "",
        error: true,
        errorMessage: "Proszę podać datę karty",
      },
      cartControlNumber: {
        cartControlNumberValue: "",
        error: true,
        errorMessage: "Proszę podać kod kontrolny karty",
      },
    };
  },
  methods: {
    errorInfo() {
      if (this.cartNumber.cartNumberValue.length === 0) {
        this.cartNumber.errorMessage = "Proszę podać numert karty";
      } else {
        this.cartNumber.errorMessage = "Nieprawidłowy numer karty";
      }
      if (this.cartDate.cartDateValue.length === 0) {
        this.cartDate.errorMessage = "Proszę podać datę karty";
      } else {
        this.cartDate.errorMessage =
          "Nieprawidłowa data karty. Przykład(07/2026)";
      }
      if (this.cartControlNumber.cartControlNumberValue.length === 0) {
        this.cartControlNumber.errorMessage =
          "Proszę podać kod kontrolny karty";
      } else {
        this.cartControlNumber.errorMessage =
          "Nieprawidłowy kod kontrolny karty";
      }
    },
  },
  mounted() {
    this.$store.dispatch("cardPaymentValidation", {
      cartNumber: this.cartNumber.error,
      cartDate: this.cartDate.error,
      cartControlNumber: this.cartControlNumber.error,
    });
  },

  updated() {
    const cartNumberRegex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    this.cartNumber.error = !cartNumberRegex.test(
      String(this.cartNumber.cartNumberValue).toLowerCase()
    );
    const cartMonth = this.cartDate.cartDateValue.slice(0, 2);
    const cartYear = this.cartDate.cartDateValue.slice(
      3,
      this.cartDate.cartDateValue.length
    );
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    if (
      currentYear < Number(cartYear) &&
      currentYear + 15 > Number(cartYear) &&
      Number(cartMonth <= 12)
    ) {
      this.cartDate.error = false;
    } else if (
      currentYear === Number(cartYear) &&
      currentMonth <= Number(cartMonth)
    ) {
      this.cartDate.error = false;
    } else {
      this.cartDate.error = true;
    }

    this.cartControlNumber.error =
      this.cartControlNumber.cartControlNumberValue.length < 3;

    this.$store.dispatch("cardPaymentValidation", {
      cartNumber: this.cartNumber.error,
      cartDate: this.cartDate.error,
      cartControlNumber: this.cartControlNumber.error,
    });
  },
  destroyed() {
    this.cartNumber.error = false;
    this.cartDate.error = false;
    this.cartControlNumber.error = false;
    this.$store.dispatch("cardPaymentValidation", {
      cartNumber: this.cartNumber.error,
      cartDate: this.cartDate.error,
      cartControlNumber: this.cartControlNumber.error,
    });
  },
};
</script>
