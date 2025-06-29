import React from 'react';
import './About.css';
import authorImage from '../../images/author.jpg';

function About() {
  return (
    <section className="about">
      <img
        src={authorImage}
        alt="Photo of Yuriy, author of the site"
        className="about__image"
      />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__description">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
