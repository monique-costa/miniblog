import styles from './Home.module.css'

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import Post from '../../components/Post/Post';

const Home = () => {
  const [ query, setQuery ] = useState("");
  
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/miniblog/search?q=${query}`);
    }
  }

  return (
    <div className='blog-container'>
      <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>

        <form className={styles.search_form} onSubmit={handleSubmit}>
          <input type="text" placeholder='Ou pesquise por tags' onChange={(e) => setQuery(e.target.value)} value={query} />
          <button className="btn btn-dark">Pesquisar</button>
        </form>

        <div className={styles.post_container}>
          {loading && <p>Carregando...</p>}

          {posts && posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}

          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Ainda não existe nenhum post! :(</p>
              <Link to="/miniblog/posts/create" className="btn">Criar post</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home