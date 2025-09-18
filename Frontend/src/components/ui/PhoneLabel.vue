<template>
  <span>{{ formatPhoneNumber }}</span>
</template>

<script>
  import countries from '@/data/countries.json';

  export default {
    props: {
      data: {
        type: String,
        required: true,
      },
    },

    computed: {
      cleanedNumber() {
        return this.data ? this.data.replace(/[^\d]/g, '') : '';
      },

      formatPhoneNumber() {
        const countryCode = parseInt(this.cleanedNumber.substring(0, 2));
        const ddd = this.cleanedNumber.substring(2, 4);
        const phoneNumberP1 = this.cleanedNumber.length === 12 ? this.cleanedNumber.substring(4, 8) : this.cleanedNumber.substring(4, 9);
        const phoneNumberP2 = this.cleanedNumber.length === 12 ? this.cleanedNumber.substring(8) : this.cleanedNumber.substring(9);

        return `+${countryCode} (${ddd}) ${phoneNumberP1}-${phoneNumberP2}`;
        
      },

      countryCode() {
        const phonePrefix = this.cleanedNumber.slice(0, 4);
        const country = countries.find((country) => country.phonePrefix === phonePrefix);

        return country ? country.iso.toLowerCase() : 'br';
      }
    },
  };
</script>