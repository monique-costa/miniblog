import styles from './EditPost.module.css'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument'; 

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  useEffect(() => {
    if (post){
        setTitle(post.title);
        setImage(post.image);
        setBody(post.body);

        const textTags = post.tagsArray.join(", ");
        setTags(textTags);

    }
  }, [post])

  const { updateDocument, response } = useUpdateDocument("posts", id)

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // Create tag array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // Check all values
    if(!title || !image || !body || !tags){
      setFormError("Por favor, preencha todos os campos.")
    }

    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data);

    // Redirect to home
    navigate("/miniblog/dashboard");
  }

  return (
    <div className='blog-container'>
      <div className={styles.edit}>

        {post && (
          <>
          <h2>Editar post</h2>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name="title" placeholder='Pense num bom título' value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </label>
            <label>
              <span>URL da imagem:</span>
              <input type="text" name="image" placeholder='Escolha uma imagem e cole a URL aqui' value={image} onChange={(e) => setImage(e.target.value)} required/>
            </label>

            <p>Preview da imagem atual:</p>
            <img src={post.image} alt={post.title} className={styles.preview}/>

            <label>
              <span>Conteúdo:</span>
              <textarea name="body" placeholder='Escreva seu post aqui' value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type="text" name="tags" placeholder='Digite as tags separadas por vírgula' value={tags} onChange={(e) => setTags(e.target.value)} required/>
            </label>

            {!response.loading && <button className='btn'>Editar!</button>}
            {response.loading && <button className='btn'>Aguarde...</button>}

            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
          </>
        )}
      </div>
    </div>
  )
}

export default EditPost