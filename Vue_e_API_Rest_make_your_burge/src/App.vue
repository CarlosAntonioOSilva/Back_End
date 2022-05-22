<template>

  <!-- Chama o componente "Navebar.vue" e passa as props "logo" e "alt" -->
  <Navbar :logo="logo_src" :alt="app_name"/>
  
  <!-- Quando clicado no respectivo link, 
    recebe os componentes da rota, neste caso, 
    "HomeView.vue" e "Pedidos.vue" -->
  <router-view/>

  <!-- Chama o componente "Footer.vue" -->
  <Footer/>

</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data(){
      return{
        //declara propriedades
        logo_src: "/img/logo.png",
        app_name:"Make Your Burger"
      }
    }
  }
</script>

<style>

  *{
    font-family: Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .main-container{
    
    min-height: 250px;
  }

  h1{
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }

</style>
