import { useState } from 'react'
import CriarContaDeUsuario from './CriarContaDeUsuario'
import style from './Login.module.css'
import { Link } from 'react-router-dom'



function Login(){

    // Value Inputs

    let [usuario, setUsuario] = useState('')
    let [senha, setSenha] = useState('')
    let [resposta2, setResposta2] = useState('')

   let [acessarTrueOrFalse, setAcessarTrueOrFalse] = useState(false)


   const [tabelaDeLote, setTabelaDeLote] = useState([]);
   

// Login Pronto
    const EntraNaConta = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ usuarioLogin: usuario, senhaLogin: senha }),
        });

        const data = await response.json();
        
         if ( await data.AcessoLiberado === 'liberado') {
         setResposta2('Acesso Liberado');
         setAcessarTrueOrFalse(true)
         setTabelaDeLote(data.LotesCriados)

        } else {
            setResposta2('Usuário Não Exiter');
        }
    };

    const acessoAoUsuario = {
            opacity: acessarTrueOrFalse ? '0':'1',
            transform: acessarTrueOrFalse ? 'translateX(-90%)':'translateX(0%)',
            transition: 'opacity ease 2s, transform ease 2s',
            display: 'flex',
            gap: '1rem',
            position: 'absolute'
        }
    const acessoAoUsuario2 = {
            opacity: !acessarTrueOrFalse ? '0':'1',
            transform: !acessarTrueOrFalse ? 'translateX(-90%)':'translateX(0%)',
            transition: 'opacity ease 2s, transform ease 2s',
        }




    // Value Criar Lotes
    let [nomeDoLote, setNomeDoLote] = useState('')
    let [numeroDoLote, setNumeroDoLote] = useState('')
    let [statusDoLote, setStatusDoLote] = useState('')

    const CriarLotesFunção = async(event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/criarLotes', {
            method: 'POST',
            header: {
                'Content-Type':'application/x-www-form-urndercode',
            },
            body: new URLSearchParams({nomeLoteName:nomeDoLote, numeroLoteName:numeroDoLote, statusLoteName:statusDoLote})
        })

        const data = await response.json()
        setTabelaDeLote( await data.LotesCriados)

    }

    // ExcluirLote

    let [excluirLote, setExcluirLote] = useState(' ')

    const ExcluirLoteFuncao = async(event) =>{
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/excluirLote', {
            method:'POST',
            header: {
                'Content-Type':'appication/x-www-form-urndercode',
            },
            body: new URLSearchParams({excluirLoteName:excluirLote})
        })
        const data = await response.json()
        setTabelaDeLote(await data.LotesCriados)


    }


    return(
        // Login Ok
        <div className={style.container}>
            <section className={style.loginEcriarLote} style={acessoAoUsuario}>
                <div className={style.loginContainer}>
                    <h1>Login</h1>
                    <form onSubmit={EntraNaConta}>
                        <div>
                            <img src='./assets/username.png' alt='icone username' />
                            <input type='text' id='usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} name='suarioLogin' placeholder='Username'/>
                        </div>
                        <div>
                            <img src='./assets/senhaicone.png' alt='icone username' />
                            <input type='password' id='senhaId' value={senha} onChange={(e) => setSenha(e.target.value)} name='senhaLogin' placeholder='Senha'/>
                        </div>
                        <input  id={style.submitId} type='submit' value="Entrar" />
                    </form>
                    {resposta2}
                </div>
                <Link to='/'><span>Volta</span></Link>
                <CriarContaDeUsuario />
            </section>
        {/* Tabela de Lotes*/}
            {/* Exibir lote */}
            <section className={style.criarLotes} style={acessoAoUsuario2}>
                <h3>Tabela De Lotes</h3>
                <ul>
                {tabelaDeLote.map((item, index) => (
                    <li key={index} className={style.blocoLote}><span>Id Lote #{item[0]}</span><span>Nome do Lote: {item[1]}</span> <span>Numero Do Lote: {item[2]}</span> <span className={style.loteAVenda} style={{color: item[3] === 'A Venda' ? 'red':'green'}}><span className={style.loteAVendaPlaca}>{item[3]}</span></span></li>
                     ))}
                </ul>
                <div className={style.criarLoteExcluirLote}>
                    {/* Criar Lotes */}
                    <form onSubmit={CriarLotesFunção} className={style.criarLoteFuncaoClass}>
                        <lable htmlFor='NomeDoLoteId'>Nome do Lote</lable>
                            <input type='text' id="NomeDoLoteId" value={nomeDoLote} onChange={(e) => setNomeDoLote(e.target.value)} name='nomeLoteName'/> 
                        <label htmlFor='NumeroDoLoteId'>Número do Lote</label>
                            <input type='number' id="NumeroDoLoteId" value={numeroDoLote} onChange={(e) => setNumeroDoLote(e.target.value)} min='1' max='99' name='numeroLoteName'/> 
                        <label >Status do Lote</label>
                            <div>
                                <label htmlFor='aVendaId'>A Venda</label>
                                    <input type='radio' id='aVendaId' value='A Venda' onChange={(e) => setStatusDoLote(e.target.value)} name='statusLoteName'/>
                                <label htmlFor='vendidoId'>Vendido</label>
                                    <input type='radio' id='vendidoId' value="Vendido" onChange={(e) => setStatusDoLote(e.target.value)} name='statusLoteName'/>
                            </div>
                        <input type='submit' value='Criar Lote' />
                    </form>
                    {/* excluir lote */}
                    <form onSubmit={ExcluirLoteFuncao} className={style.excluirLoteClass}>
                        <label htmlFor='excluirLoteId'>Informe o Id do Lote a se excluido</label>
                        <input type='number' id='excluirLoteId' value={excluirLote} onChange={(e) => setExcluirLote(e.target.value)} min="1" max="99" name='excluirLoteName' />
                        <input type='submit' value='Excluir Lote' />
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login