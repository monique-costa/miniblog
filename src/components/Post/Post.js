import styles from './Post.module.css';

import { Link } from 'react-router-dom';

const Post = ({post}) => {
  return (
    <div className={styles.post}>
        <img src={post.image} alt={post.title}/>
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline' >Ler conteúdo</Link>
    </div>
  )
}

export default Post