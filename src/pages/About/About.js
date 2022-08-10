// CSS
import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o projeto</h2>
        <p>Este projeto tem como objetivo realizar uma análise de cotações de valores do preço diário da ação da Petrobrás. Através de um algoritmo feito em Python, que analisa uma grande base temporal de preços para que chegue ao valor mais aproximado.</p>
        <p>Projeto desenvolvido Lucas Henrique Soares Cruz e André Augusto de Almeida Machado, alunos da Universidade Estadual do Estado de Minas Gerais (UEMG), campus Frutal - Minas Gerais.</p>
        <Link to='/login' className='btn'>Faça Parte</Link>
    </div>
  )
}

export default About