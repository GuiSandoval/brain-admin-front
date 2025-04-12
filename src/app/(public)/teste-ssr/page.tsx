// app/components/Posts.tsx
import React from "react";

// Definindo o tipo para os dados
type Post = {
  id: number;
  title: string;
  body: string;
};

const Posts = async () => {
  // Fazendo a requisição para a API JSONPlaceholder
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json(); // Convertendo a resposta para o formato esperado

  // Retornando a lista de posts
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
