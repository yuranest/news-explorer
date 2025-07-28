import React from 'react';
import './About.css';
import authorImage from '../../images/author.jpg';

function About() {
  return (
    <section className="about">
      <img
        src={authorImage}
        alt="Yuriy Nesterenko, author of the project"
        className="about__image"
      />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          My name is Yuriy. I'm a web developer with a passion for clean design,
          user-focused interfaces, and modern JavaScript technologies like React
          and Vite.
        </p>
        <p className="about__description">
          This project is a part of my final work at the TripleTen Bootcamp. It
          demonstrates layout building, component structure in React, and
          third-party API integration using NewsAPI.
        </p>
      </div>
    </section>
  );
}

export default About;
