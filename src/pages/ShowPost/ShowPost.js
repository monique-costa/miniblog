import styles from './ShowPost.module.css';

// hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const ShowPost = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className='blog-container'>
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}

            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title}/>
                    <p className={styles.author}>Autor: <span>{post.createdBy}</span></p>
                    <p>{post.body}</p>
                    <h3>Tags:</h3>
                    <ul className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <li key={tag}> <span>#</span>{tag}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    </div>
  )
}

export default ShowPost