import styles from './CreatePost.module.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirect to home
    navigate("/miniblog/");
  }

  return (
    <div className='blog-container'>
      <div className={styles.create}>

        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe sua história com a comunidade!</p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input type="text" name="title" placeholder='Pense num bom título' value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </label>
          <label>
            <span>URL da imagem:</span>
            <input type="text" name="image" placeholder='Escolha uma imagem e cole a URL aqui' value={image} onChange={(e) => setImage(e.target.value)} required/>
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea name="body" placeholder='Escreva seu post aqui' value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input type="text" name="tags" placeholder='Digite as tags separadas por vírgula' value={tags} onChange={(e) => setTags(e.target.value)} required/>
          </label>

          {!response.loading && <button className='btn'>Criar!</button>}
          {response.loading && <button className='btn'>Aguarde...</button>}

          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreatePost