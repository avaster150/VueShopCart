<template>
  <div class="inputDataValidation">
    <div
      v-for="item in inputDataValidation"
      :key="item.id"
      class="data-input-item"
    >
      <label :for="item.id">{{ item.name }}</label>
      <input
        :type="item.type"
        :placeholder="item.name"
        :name="item.name"
        :id="item.id"
        v-model="item.nameValue"
        v-mask="item.vMask"
      />
      <p v-if="item.error" class="error">
        {{ item.errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputDataValidation: {
        zipCode: {
          name: "Kod pocztowy",
          id: "zipCode",
          type: "text",
          nameValue: "",
          vMask: "##-###",
          error: true,
          errorMessage: "Proszę podać prawidłowy kod pocztowy",
        },
        email: {
          name: "E-mail",
          id: "email",
          type: "text",
          nameValue: "",
          vMask: "",
          error: true,
          errorMessage: "Proszę podać prawidłowy E-mail",
        },
        phone: {
          name: "Telefon",
          id: "phone",
          type: "text",
          nameValue: "",
          vMask: "###-###-###",
          error: true,
          errorMessage: "Proszę podać numer telefonu",
        },
      },
    };
  },
  mounted() {
    this.$store.dispatch("inputValidation", {
      zipCode: this.inputDataValidation.zipCode.error,
      email: this.inputDataValidation.email.error,
      phone: this.inputDataValidation.phone.error,
    });
  },

  updated() {
    this.inputDataValidation.zipCode.error =
      this.inputDataValidation.zipCode.nameValue.length < 6;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.inputDataValidation.email.error = !emailRegex.test(
      String(this.inputDataValidation.email.nameValue).toLowerCase()
    );
    this.inputDataValidation.phone.error =
      this.inputDataValidation.phone.nameValue.length < 11;

    this.$store.dispatch("inputValidation", {
      zipCode: this.inputDataValidation.zipCode.error,
      email: this.inputDataValidation.email.error,
      phone: this.inputDataValidation.phone.error,
    });
  },
};
</script>