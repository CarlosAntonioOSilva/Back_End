<template>

  <!-- v-if="burgers", se existir valor na propriedade "burgers", insere o elemento  -->  
  <div id="burger-table" v-if="burgers">
    
    <!-- Cabeçalho da tabela que lista os pedidos -->
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>

    <!-- Linhas da tabela que lista os pedidos -->
    <div id="burger-table-rows">
      <!-- faz um loop na propridade "burges" e preenche os elementos filhos -->  
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul v-for="(opcional, index) in burger.opcionais" :key="index">
            <li>{{ opcional }}</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, burger.id)">
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="burger.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <!-- chama o método responsável por enviar uma requisição de exclusão do pedido -->
          <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- v-else, se não existir valor na propriedade "burgers", insere o elemento  -->  
  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>

</template>
<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        burgers: null,
        burger_id: null,
        status: []
      }
    },
    methods: {
      //método assíncrono que realiza uma requisição para a API/Servidor na URL indicada  
      async getPedidos() {
        //realiza a requisição  
        const req = await fetch('http://localhost:3000/burgers')
        //recebe os dados da requisição
        const data = await req.json()
        //atribui os dados a propriedade "burgers"
        this.burgers = data

        // chama o método que resgata os status de pedidos
        this.getStatus()
      },
      //método assíncrono que realiza uma requisição para a API/Servidor na URL indicada  
      async getStatus() {
        //realiza a requisição  
        const req = await fetch('http://localhost:3000/status')
        //recebe os dados da requisição
        const data = await req.json()
        //atribui os dados a propriedade "status"
        this.status = data
      },
      //método assíncrono que realiza uma requisição para a API/Servidor na URL indicada  
      async deleteBurger(id) {

        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "DELETE"
        });

        const res = await req.json()

        this.getPedidos()

      },
      async updateBurger(event, id) {

        const option = event.target.value;

        const dataJson = JSON.stringify({status: option});

        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson
        });

        const res = await req.json()

        console.log(res)

      }
    },
    //método nativo do Vue que executa uma instrução quando a aplicação é montada
    mounted () {
    this.getPedidos()
    }
  }
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>