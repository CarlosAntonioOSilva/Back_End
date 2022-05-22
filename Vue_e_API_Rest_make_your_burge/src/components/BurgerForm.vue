<template>
    <div>
        <!-- Chama o componete que recebe a mensagem da aplicação e passa a propriedade "msg" -->
        <!-- v-show, se a propriedade "msg" existir, exibe o componente chamado -->
        <Message :msg="msg" v-show="msg"/>

        <div>
            <!-- @submit, escuta o envento de envio do formulário e chama o método "createBurger" -->
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do Cliente</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome!">
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <!-- loop na propriedade "paes" que recebe os dados da API e preenche o select -->
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu Burger:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione o tipo de carne</option>
                        <!-- loop na propriedade "paes" que recebe os dados da API e preenche o select -->
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                    </select>
                </div>
                <div class="input-container" id="opcionais-container">
                    <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                    <!-- loop na propriedade "paes" que recebe os dados da API e preenche o select -->
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" id="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{ opcional.tipo }}</span>
                    </div>
                </div>
                <!-- Botão para envio do formulário -->
                <div class="input-container">
                    <input type="submit" value="Criar meu Burger!" class="submit-btn">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Message from "./Message.vue"
    export default {
        name: "BurgerForm",
        data(){
            return{
                //declara as propriedades que recebem os dados requisitados à API (servidor)
                paes: null,
                carnes: null,
                opcionaisdata: null,
                //declara as propriedades que enviam dados para API (servidor)
                nome: null,
                pao: null,
                carne: null,
                opcionais: [],
                msg: null
            }
        },
        components:{
            Message
        },
        methods: {
            
            //método assíncrono que requisita os dados à API
            async getIngredientes(){
                //requisita dados
                const req = await fetch("http://localhost:3000/ingredientes");
                //recebe os dados
                const data = await req.json();

                //atribui às propriedades os dados recebidos
                this.paes = data.paes;
                this.carnes = data.carnes;
                this.opcionaisdata = data.opcionais;
            },

            //método assíncrono que envia os dados do formulário para a API
            async createBurger(e){
                
                e.preventDefault();

                //declara um objeto que atribui às propriedades do Vue os dados recebidos do formulário
                const data = {
                    nome: this.nome,
                    carne: this.carne,
                    pao: this.pao,
                    opcionais: Array.from(this.opcionais), //Array.from, cria um array com os dados
                    status: "Solicitado"
                }

                //converte o objeto "data" em texto para envio à API
                const dataJson = JSON.stringify(data);

                //executa a requisição http para a API/Servidor
                const req = await fetch("http://localhost:3000/burgers", {  
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                });

                //recebe a resposta do envio dos dados
                const res = await req.json();

                //exibe mensagem na tela do usuário
                this.msg = `Pedido Nº ${res.id} realizado com sucesso!`;

                //limpa os campos do formulário
                setTimeout(()=> this.msg = "", 3000);//limpa a mensagem após 3 segundos
                this.nome = '';
                this.carne = '';
                this.pao = '';
                this.opcionais = '';
            }
        },
        //método nativo do Vue que executa uma instrução quando a aplicação é montada
        mounted(){
            //executa o método que realização a requisição
            this.getIngredientes();
        }
    }
</script>

<style scoped>
    #burger-form{
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label{
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #fcba03;
    }

    input, select{
        padding: 5px 10px;
        width: 300px;
    }

    #opcionais-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    #opcionais-title{
        width: 100%;
    }

    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span, .checkbox-container input{
        width: auto;
    }

    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn{
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }

</style>