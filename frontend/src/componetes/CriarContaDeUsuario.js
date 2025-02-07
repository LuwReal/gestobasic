import { useState } from 'react'
import style from './CriarContaDeUsuario.module.css'


function CriarContaDeUsuario(){

    // value Inputs
    let [usuario, setUsuario] = useState('')
    let [senha, setSenha] = useState('')
    // valorRetonado da API
    let [returnAPI, setReturnAPI] = useState('')
    const CriarConta = async(event) => {
        event.preventDefault()

        const response = await fetch("http://127.0.0.1:5000/criarUsuario", {
            method: "POST",
            header: {
                'Content-Type':'application/x-www-form-urndercode',
            },
            body: new URLSearchParams({usuarioName:usuario, senhaName:senha}),
        })
        const data = await response.json()
        if(data.AtivaBanner === true){
            setReturnAPI('Usuario Criado')
        }else{
            setReturnAPI('Usuario Exitente')
        }
    }

    return(
        <div className={style.container}>
            <section className={style.criarConta}>
            <h1>Criar Conta</h1>
                <form onSubmit={CriarConta}>
                    <input type='text' id='usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} name='usuarioName' placeholder='Username'/>
                    <input type='password' id='senha' value={senha} onChange={(e) => setSenha(e.target.value)} name='senhaName' placeholder='Senha'/>
                    <input type='submit' id='enviar'/>
                    {returnAPI}
                </form>
            </section>
            
        </div>
    )
}

export default CriarContaDeUsuario