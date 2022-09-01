import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

// hooks
import  { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading} = useFetchDocuments("posts", null, uid);
  const { deleteDocument } =  useDeleteDocument("posts");


  if (loading) {
    return <p>Carregando...</p>
  }
  
  return (
    <div className='blog-container'>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p>Gerencie os seus posts</p>

        {posts && posts.length === 0 ? (
          <div className={styles.nopost}>
            <p>Você ainda não tem nenhum post, que tal criar o primeiro?</p>
            <Link to="/posts/create" className='btn'>Criar post!</Link>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span>Título</span>
              <span>Ações</span>
            </div>

            {posts && posts.map((post) => (
              <div key={post.id} className={styles.row} >
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline dash"> Ver </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn btn-outline dash"> Editar </Link>
                  <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger dash"> Excluir </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard