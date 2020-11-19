/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import {
  FiChevronRight,
  FiUser,
  FiBookmark,
  FiBookOpen,
  FiTarget,
} from 'react-icons/fi';
import * as Yup from 'yup';
import api from '../../services/api';
import Header from '../../components/Header';

import getValidationsErrors from '../../utils/getValidationErrors';

import { Title, Posts } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';

interface NewPost {
  id: string;
  title: string;
  user: string;
  message: string;
  date: Date;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [posts, setPosts] = useState<NewPost[]>([]);

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: NewPost) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Título requerido'),
          user: Yup.string().required('Usuário obrigatório'),
          message: Yup.string().required('Escreva sobre sua postagem'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        history.push('/');
        await api.post('/posts', data);
        const post = await api.get('/posts');
        setPosts(post.data);
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
    [setPosts, history],
  );
  return (
    <>
      <Header />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>
          <p>Faça seu Post</p>
        </Title>
        <Input name="user" placeholder="Usuário" icon={FiUser} />
        <Input name="title" placeholder="Título" icon={FiBookmark} />
        <Input name="message" placeholder="Postagem" icon={FiBookOpen} />
        <Button type="submit">
          <p>Publicar</p>
        </Button>
      </Form>
      <Title>
        <p>Publicações</p>
      </Title>
      <Posts>
        {posts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <FiTarget size={20} />
            <div>
              <strong>{post.title}</strong>
              <p>{post.date}</p>
              <p>{post.message}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Posts>
    </>
  );
};

export default Dashboard;
