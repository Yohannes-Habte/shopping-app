import React from 'react';
import './Blog.scss';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section className="blog-container">
      <h1 className="blog-title"> Best Docartion for Home Decoration </h1>
      <p className="pargraph">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        nemo sequi ducimus recusandae, maxime ea reprehenderit fugit dolore
        iste! Exercitationem earum cumque, voluptatem delectus corporis ipsum
        praesentium suscipit fugit quae!
      </p>
      <Link to={'/products'} className='link'>
        <button className="blog-btn">Shop Now</button>
      </Link>
    </section>
  );
};

export default Blog;
