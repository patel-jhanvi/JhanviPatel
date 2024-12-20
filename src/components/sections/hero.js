import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: var(--nav-height) 20px 0;
`;

const StyledHeroText = styled.div`
  flex: 1;
  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    font-size: 48px;
    line-height: 1.1;
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .skills-list {
    margin-top: 20px;
    list-style: disc;
    padding-left: 20px;
    color: var(--light-slate);
    font-size: var(--fz-lg);

    li {
      margin-bottom: 10px;
    }
  }

  .linkedin-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledPic = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
    } else {
      const timeout = setTimeout(() => setIsMounted(true), navDelay);
      return () => clearTimeout(timeout);
    }
  }, [prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Jhanvi Patel.</h2>;
  const three = <h3 className="big-heading">I build things for Web with Cloud!</h3>;
  const four = (
    <>
      <p>
        I design and develop scalable, user-centric web applications and softwares, combining the
        power of AWS with cutting-edge cloud technologies and modern software design principles.
        With a Master's in Informatics, specializing in Cloud Computing from Northeastern
        University, I’ve built a solid foundation in cloud architecture and full-stack development.
        My approach blends technical expertise with a keen eye for creating intuitive, high-quality
        user experiences.
      </p>
      <p>
        I’m skilled in leveraging AWS for cloud infrastructure, using React, JavaScript, TypeScript
        to build dynamic web applications, and applying software design practices to ensure
        maintainable, robust solutions. I’m passionate about using the cloud to streamline web and
        software development, building solutions that deliver real-world impact.
      </p>
      <p>
        Currently, I’m seeking full-time opportunities where I can apply my skills in cloud
        computing, software design, and development to contribute to innovative, meaningful
        projects.
      </p>
      <p>Code ideas that impact lives!</p>
    </>
  );
  const five = (
    <a
      className="linkedin-link"
      href="https://www.linkedin.com/in/jhanvipatel/"
      target="_blank"
      rel="noreferrer">
      Let's Connect
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <StyledHeroText>
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </StyledHeroText>
      <StyledPic>
        <div className="wrapper">
          <StaticImage
            className="img"
            src="../../../src/images/me.png"
            width={500}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Headshot"
            style={{ opacity: 1 }}
          />
        </div>
      </StyledPic>
    </StyledHeroSection>
  );
};

export default Hero;
