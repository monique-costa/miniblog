import styles from './About.module.css'

import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className='blog-container'>
      <div className={styles.about}>
        <div className={styles.text_container}>
          <h2>Sobre o Mini <span>Blog</span></h2>
          <p>Esse projeto consiste em um blog feito com React e Firebase.</p>
          <p>Codificado por <strong>Monique Costa</strong>! Conheça um pouco mais sobre mim visitando:</p>
          <p>
            <a href="https://www.linkedin.com/in/monique-costa/" target="_blank">LinkedIn</a> | 
            <a href="https://github.com/monique-costa" target="_blank">GitHub</a> | 
            <a href="https://monique-costa.github.io/portfolio/" target="_blank">Portfólio</a> 
          </p>
        </div>

        <p>Gostou do Mini <span>Blog</span>? Crie sua conta e participe.</p>
        <Link to="/miniblog/register" className='btn'>Cadastre-se</Link>
      </div>
    </div>
  )
}

export default About