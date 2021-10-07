<template>
  <form class="personal-data">
    <h1>Dostawa i płatność</h1>
    <div class="radio-box">
      <h2>1. Sposób dostawy</h2>

      <div class="radio-choose">
        <div
          v-for="item in deliveryChooseItems"
          :key="item.id"
          class="radio-choose-item"
        >
          <input
            @click="deliveryChoosePrice"
            type="radio"
            :name="item.name"
            :id="item.id"
            :value="item.value"
            v-model="deliveryChoose"
          />
          <label :for="item.id"
            >{{ item.value }} <span>{{ item.price }}</span></label
          >
        </div>
      </div>
    </div>

    <div v-if="deliveryChoose" class="radio-box">
      <h2>2. Metoda płatności</h2>
      <div class="radio-choose">
        <div
          v-for="item in paymentChooseItems"
          :key="item.id"
          class="radio-choose-item"
        >
          <input
            @click="paymentChoosePrice"
            type="radio"
            :name="item.name"
            :id="item.id"
            :value="item.value"
            v-model="paymentChoose"
          />
          <label :for="item.id">
            {{ item.value }} <span>{{ item.price }}</span></label
          >
        </div>
      </div>
    </div>
    <div v-if="paymentChoose" class="data-box">
      <h2>3. Dane odbiorcy</h2>
      <div class="data-input">
        <div
          v-for="item in inputDataItems"
          :key="item.id"
          class="data-input-item"
        >
          <label :for="item.id">{{ item.name }}*</label>
          <input
            :placeholder="item.name"
            :name="item.id"
            v-model="item.nameValue"
            v-mask="item.vMask"
            :id="item.id"
            :type="item.type"
          />
          <p v-if="item.error" class="error">{{ item.errorMessage }}</p>
        </div>
        <inputDataValidation v-if="paymentChoose" />
        <cardPayment v-if="cardFormActive" />

        <label for="accept">
          <input
            class="checkbox-input"
            type="checkbox"
            name="accept"
            id="accept"
            v-model="acceptRules.acceptValue"
          />
          Akceptuje regulamin sklepu
        </label>
        <p v-if="acceptRules.error" class="error">
          {{ acceptRules.errorMessage }}
        </p>

        <button class="endButton" @click.prevent="checkData">
          Zakończ i zapłać
        </button>
      </div>
    </div>
    <endPaymentModal v-if="endPayment" />
  </form>
</template>
<script>
import inputDataValidation from "./inputDataValidation.vue";
import cardPayment from "./cardPayment.vue";
import endPaymentModal from "./endPaymentModal.vue";
export default {
  components: { inputDataValidation, endPaymentModal, cardPayment },
  data() {
    return {
      deliveryChooseItems: [
        {
          name: "pickup",
          id: "pickup",
          value: "Odbiór osobisty",
          price: "(bezpłatnie)",
        },
        {
          name: "deliveryMan",
          id: "deliveryMan",
          value: "Kurier",
          price: "(10$)",
        },
        {
          name: "percelLocker",
          id: "percelLocker",
          value: "Paczkomaty 24/7",
          price: "(bezpłatnie)",
        },
      ],
      paymentChooseItems: [
        {
          name: "paymentCart",
          id: "paymentCart",
          value: "Karta płatnicza",
          price: "(bezpłatnie)",
        },
        {
          name: "paypal",
          id: "paypal",
          value: "Paypal",
          price: "(bezpłatnie)",
        },
        {
          name: "self",
          id: "self",
          value: "Przy odbiorze",
          price: "(20$)",
        },
      ],
      deliveryChoose: "",
      deliveryPrice: 0,
      paymentChoose: "",
      paymentPrice: 0,

      inputDataItems: [
        {
          name: "Imię",
          id: "name",
          type: "text",
          nameValue: "",
          vMask: "",
          error: true,
          errorMessage: "Proszę podać imię",
        },
        {
          name: "Naziwsko",
          id: "lastname",
          type: "text",
          nameValue: "",
          vMask: "",
          error: true,
          errorMessage: "Proszę podać nazwisko",
        },
        {
          name: "Ulica i numer",
          id: "adres",
          type: "text",
          nameValue: "",
          vMask: "",
          error: true,
          errorMessage: "Proszę podać adres",
        },
        {
          name: "Miejscowość",
          id: "city",
          type: "text",
          nameValue: "",
          vMask: "",
          error: true,
          errorMessage: "Proszę podać miasto",
        },
      ],

      acceptRules: {
        acceptValue: "",
        error: true,
        errorMessage: "Zaakceptuj warunki sklepu",
      },
      cardFormActive: false,
      endPayment: false,
    };
  },
  computed: {
    checkCardValidation() {
      return this.$store.state.checkCardValidation;
    },
    checkInputValidation() {
      return this.$store.state.checkInputValidation;
    },
  },
  updated() {
    this.inputDataItems.forEach((item) => {
      item.error = item.nameValue < 1;
    });
    console.log(this.checkInputValidation);
    this.acceptRules.error = !this.acceptRules.acceptValue;
  },
  methods: {
    deliveryChoosePrice(e) {
      if (e.target.id === "deliveryMan") {
        this.deliveryPrice = 10;
      } else {
        this.deliveryPrice = 0;
      }
      this.$store.dispatch("deliveryChoosePrice", this.deliveryPrice);
    },
    paymentChoosePrice(e) {
      if (e.target.id === "self") {
        this.paymentPrice = 20;
      } else {
        this.paymentPrice = 0;
      }
      if (e.target.id === "paymentCart") {
        this.cardFormActive = true;
      } else {
        this.cardFormActive = false;
      }
      this.$store.dispatch("paymentChoosePrice", this.paymentPrice);
    },
    checkData() {
      const existErrorArray = this.inputDataItems.map((item) => {
        return item.error;
      });
      const existErrorObject = Object.assign({}, existErrorArray);
      const existError = Object.keys(existErrorObject).find((id) => {
        return existErrorObject[id];
      });
      if (
        !existError &&
        !this.acceptRules.error &&
        !this.checkInputValidation.zipCode &&
        !this.checkInputValidation.email &&
        !this.checkInputValidation.phone &&
        !this.checkCardValidation.cartNumber &&
        !this.checkCardValidation.cartDate &&
        !this.checkCardValidation.cartControlNumber
      ) {
        this.endPayment = true;
      } else {
        alert("Wypełnij wymagane pola");
      }
    },
  },
};
</script>

<style>
</style>
