import styles from './Search.module.css'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// components
import Post from '../../components/Post/Post';


import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const {documents: posts} = useFetchDocuments("posts", search);

  console.log(posts);

  return (
    <div className='blog-container'>
      <div className={styles.search_container}>
        <h1>Pesquisa</h1>
        <p className={styles.searched}>Você pesquisou: #{search}</p>

        {posts && posts.length === 0 && (
          <div className={styles.search}>
            <p>Ainda não existe nenhum post que corresponda à sua pesquisa! :(</p>
            <Link to="/" className='btn btn-dark'>Voltar</Link>
          </div>
        )}

        {posts && posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

      </div>
    </div>
  )
}

export default Search