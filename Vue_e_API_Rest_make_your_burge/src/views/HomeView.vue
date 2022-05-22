<template>

  <div class="main-container">

    <!-- chama o componente "Banner.vue" -->
    <Banner/>

    <h1>Monteu seu burger:</h1>
    <BurgerForm/>
    
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import BurgerForm from "../components/BurgerForm.vue";

export default{
  name: "Home",
  components:{
    Banner,
    BurgerForm
  }
}

</script>

<style scoped>

</style>

