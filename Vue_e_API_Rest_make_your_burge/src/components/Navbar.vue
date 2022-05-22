<template>
  <nav id="nav">
    
    <router-link id="logo-url" to="/"> 
      <!-- recebe, dinamicamente da view, as props "logo" e "alt",
      que alteram os atributos "src" e "alt" do elemento "img" -->
      <img  :src="logo" :alt="alt" id="logo"> 
    </router-link>

    <!-- o atributo "to" define qual rota o link vai representar, 
    neste caso, chama o componente "HomeView.vue"  -->
    <router-link to="/">Home</router-link>

    <!-- o atributo "to" define qual rota o link vai representar, 
    neste caso, chama o componente Pedido.vue"  -->
    <router-link to="/Pedidos">Pedidos</router-link>
    
  </nav>

</template>

<script>
  export default {
    name: 'Navbar',

    //declara as propriedades recebidas
    props:["logo", "alt"]
  };
</script>

<style scoped>

  #nav{
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  #nav #logo-url{
    margin: auto;
    margin-left: 0;
  }

  #logo{
    margin: auto;
    margin-left: 0;
  }

  #nav a{
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }
#nav a:hover{
  color: #fff;
  
}


</style>

