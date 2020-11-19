import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiUser, FiBookOpen } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationsErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { PostInfo, Comments, Title } from './styles';
import Input from '../../components/input';
import Header from '../../components/Header';
import Button from '../../components/button';

interface PostParams {
  posts: string;
}

interface Post {
  id: string;
  user: string;
  title: string;
  message: string;
}

interface Comments {
  id: string;
  user: string;
  comment: string;
  date: Date;
}

const Post: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);

  const { params } = useRouteMatch<PostParams>();

  useEffect(() => {
    api.get(`/posts/${params.posts}`).then(response => {
      setPost(response.data);
    });

    api.get(`/posts/${params.posts}/comments`).then(response => {
      setComments(response.data);
    });
  }, [params.posts]);

  const handleSubmit = useCallback(
    async (data: Comments) => {
      try {
        console.log('Entrou');
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          user: Yup.string().required('Usuário obrigatório.'),
          comment: Yup.string().required('Faça seu comentário.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        history.push(`/posts/${params.posts}`);
        await api.post(`/posts/${params.posts}/comments`, data);
        const comments = await api.get(`/posts/${params.posts}/comments`);
        setComments(comments.data);
        alert('Post criado com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        alert(`Ocorreu um erro na publicação`);
      }
    },
    [setComments, history, params.posts],
  );

  return (
    <>
      <Header />
      <Title>
        <h3>Publicação</h3>
      </Title>
      {post && (
        <PostInfo>
          <header>
            <div>
              <strong>
                Por:
                {post.user}
              </strong>
              <strong>{post.title}</strong>
              <p>{post.message}</p>
            </div>
          </header>
        </PostInfo>
      )}

      <Comments>
        <Title>
          <h3>Comentários:</h3>
        </Title>

        {comments.map(comment => (
          <a key={comment.id}>
            <div>
              <strong>
                Por:
                {comment.user}
              </strong>
              <p>{comment.date}</p>
              <p>{comment.comment}</p>
            </div>
          </a>
        ))}
        <Title>
          <h3>Faça seu comentário:</h3>
        </Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="user" placeholder="Usuário" icon={FiUser} />
          <Input name="comment" placeholder="Comentário" icon={FiBookOpen} />
          <Button type="submit">Publicar</Button>
        </Form>
      </Comments>
    </>
  );
};

export default Post;
