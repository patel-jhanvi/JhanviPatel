import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout } from '@components';
import styled from 'styled-components';
import { mixins, media, Main } from '@styles'; // Removed unused 'theme' import
import kebabCase from 'lodash/kebabCase';

const StyledMainContainer = styled(Main)`
  & > header {
    text-align: center;
    margin-bottom: 100px;

    a {
      &:hover,
      &:focus {
        cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>⚡</text></svg>")
            20 0,
          auto;
      }
    }
  }

  footer {
    ${mixins.flexBetween};
    margin-top: 20px;
    width: 100%;
  }
`;

const StyledGrid = styled.div`
  margin-top: 50px;

  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;

const PensievePage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <Helmet>
        <title>Pensieve | Jhanvi Patel</title>
        <link rel="canonical" href="https://jhanvipatel.github.io/pensieve" />
      </Helmet>

      <StyledMainContainer>
        <header>
          <h1 className="big-title">Pensieve</h1>
          <p className="subtitle">
            <a
              href="https://www.wizardingworld.com/writing-by-jk-rowling/pensieve"
              target="_blank"
              rel="noopener noreferrer">
              a collection of memories
            </a>
          </p>
        </header>

        <StyledGrid>
          <div className="posts">
            {posts.length > 0 &&
              posts.map(({ node }, i) => {
                const { frontmatter } = node;
                const { title, description, slug, date, tags } = frontmatter;
                const d = new Date(date);

                return (
                  <div key={i}>
                    <div>
                      <header>
                        <Link to={slug}>
                          <h5>{title}</h5>
                          <div>{description}</div>
                        </Link>
                      </header>
                      <footer>
                        <span>{`${d.toLocaleDateString()}`}</span>
                        <ul>
                          {tags.map((tag, i) => (
                            <li key={i}>
                              <Link to={`/pensieve/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </footer>
                    </div>
                  </div>
                );
              })}
          </div>
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

PensievePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default PensievePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
          }
          html
        }
      }
    }
  }
`;
