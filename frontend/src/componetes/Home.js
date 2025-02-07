import style from './Home.module.css'
import styleHeader from './HeaderHome.module.css'
import styleMain from './MainHome.module.css'
import styleAside from './AsideHome.module.css'
import styleFooter from './FooterHome.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'





function Home(){

    const logoTipo = {
        Imagem: "/assets/logo.jpg",
        Class: styleHeader.logoTipo
    }
    let [valueOpacity, setValueOpacity] = useState('')


    useEffect(()=>{
        const ativaEfe = () =>{
           if(window.scrollY >= 800){
            setValueOpacity('1')
        }else{
            setValueOpacity('0')
        } 
        }
        

        window.addEventListener('scroll', ativaEfe);

    }, [])



    const redeMapa = {
        opacity: valueOpacity,
        transition: 'opacity ease 2s',

    }


    let [valueOpacity2, setValueOpacity2] = useState(['0','5rem'])
    const styleTitulo = {
        opacity: valueOpacity2[0],
        marginTop: valueOpacity2[1],
        fontSizer: '1.5rem', 
        transition: 'opacity ease 1s, margin-top ease 1s',
        color: '#fff',
    }

    useEffect(() => {
            setValueOpacity2('1')
    }, [])
    
// Manipulação de strings
    const fraseSubtituicao = 'Destaque como uma gestão 78$%&*5'
    let frase1 = fraseSubtituicao.replace('78$%&*5', 'eficiente')

// Scroll Direction

const sectionRefHome = useRef(null);
const sectionRefOque = useRef(null);
const sectionRefEscopo = useRef(null);
const sectionRefProjeto = useRef(null);


const scrollDirection = (posicao) =>{
    if (posicao.current) {
        window.scrollTo({
            top: posicao.current.offsetTop,
            behavior: "smooth"
        });
    }
}




    return(
        <div className={style.container}>
            <header className={styleHeader.container} ref={sectionRefHome}>
                <img className={logoTipo.Class} src={logoTipo.Imagem} alt="Logo Imagem" title="Logo" />
                <nav className={styleHeader.menu}>
                    <ul className={styleHeader.menuList}>
                        <li onClick={() => scrollDirection(sectionRefHome)}>Home</li>
                        <li onClick={() => scrollDirection(sectionRefOque)}><span>O que é Gestão de Loteamento</span></li>
                        <li onClick={() => scrollDirection(sectionRefEscopo)}>Escopo do Projeto</li>
                        <li onClick={() => scrollDirection(sectionRefProjeto)}>Projeto</li>
                    </ul>
                </nav>
            </header>
            <div className={style.imgFundoLoteamento}><h1 style={styleTitulo}>Gesto<span>Basic</span></h1></div>
            <main className={styleMain.container}>
                <section className={styleMain.containerSection_1} ref={sectionRefOque}>
                    <div>
                        <img className={styleMain.imgObjects} src='./assets/imgExemplo4.jpg' alt='' />
                        <h1>Maximize a Rentabilidade do Seu Loteamento:</h1>
                        <p>{frase1} pode otimizar recursos,
                            reduzir custos e aumentar o retorno sobre o investimento, 
                            garantindo o sucesso do empreendimento.</p>
                    </div>
                    <div>
                        <img className={styleMain.imgObjects} src='./assets/imgExemplo3.jpg' alt='' />
                        <h1>Tecnologia e Inovação: Gestão para Loteamentos</h1>
                        <p>Aborde o uso de ferramentas tecnológicas, como softwares de gestão 
                            imobiliária, para acompanhar vendas, controle de terrenos e 
                            comunicação com clientes.</p>
                    </div>
                    <div>
                        <img className={styleMain.imgObjects} src='./assets/imgExemplo2.jpg' alt='' />
                        <h1>Gestão Transparente:</h1>
                        <p>Enfatize práticas de gestão que promovem clareza em finanças,
                            contratos e processos, criando um relacionamento de confiança 
                            com todos os envolvidos.</p>
                    </div>
                    <div>
                        <img className={styleMain.imgObjects} src='./assets/imgExemplo1.jpg' alt='' />
                        <h1>Planejamento Urbano e Sustentável:</h1>
                        <p>Foque em como a gestão considera o planejamento sustentável 
                            e o impacto ambiental, agregando valor ao loteamento e atraindo
                            um público mais consciente.</p>
                    </div>
                </section>
                <aside className={styleAside.container} style={redeMapa} ref={sectionRefEscopo}>
                    <section className={styleAside.sectionUm}>
                        <div>
                            <h2>
                            Regularização e Conformidade Legal
                            </h2>
                            <ul>
                                <li>É essencial garantir que o loteamento esteja em conformidade com as normas municipais, estaduais e federais.</li>
                                <li>Deve-se obter aprovações junto aos órgãos públicos, como prefeitura e meio ambiente.</li>
                                <li>A regularização do registro dos lotes é fundamental para evitar problemas jurídicos futuros.</li>
                            </ul>
                        </div>
                        <div>
                            <h2>
                            Infraestrutura e Urbanização
                            </h2>
                            <ul>
                            <li>Planejamento adequado de ruas, calçadas, iluminação, redes de água, esgoto e energia elétrica.</li>
                            <li>Implementação de áreas verdes e espaços públicos conforme exigências legais e necessidades dos moradores.</li>
                            <li>Manutenção e fiscalização da infraestrutura para garantir a qualidade e a segurança do local.</li>
                            </ul>
                        </div>
                    </section>
                    <div className={styleAside.linha}></div>
                    <section className={styleAside.sectionDois}>
                        <div>
                            <h2>
                            Gestão Financeira e Comercialização
                            </h2>
                            <ul>
                                <li>Definição de preços, prazos de pagamento e financiamento para atrair compradores.</li>
                                <li>Estratégias de marketing e vendas para divulgar o loteamento de forma eficiente.</li>
                                <li>Administração dos custos do empreendimento para garantir rentabilidade e cumprimento das obrigações.</li>
                            </ul>
                        </div>
                    </section>
                </aside>
                <div className={style.acessorAoGesto} ref={sectionRefProjeto}>
                    <Link to='/BasicGesto'>Acessar GestoBasic</Link>
                </div>
            </main>
            <footer className={styleFooter.container}>
                <h4>Lucas Barbosa de Souza</h4>
                <p>Redes Sociais </p>
                <ul>
                    <li>Portifólio</li>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                    <li>Instagram</li>
                </ul>
            </footer>
        </div>
    )
}
export default Home