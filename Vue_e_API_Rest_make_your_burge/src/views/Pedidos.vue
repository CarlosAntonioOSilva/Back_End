<template>
  <div>
    <div class="main-container">
      <h1>Gerenciar pedidos:</h1>
      <!-- chamada do componente "Dashboard" -->
      <Dashboard />
    </div>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard'

export default {
  name: 'Pedidos',
  components: {
    Dashboard
  }
}
</script>