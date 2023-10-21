import { graphql } from "gatsby";
import React from 'react';

import { NavComp } from "../components/mainNav";

import "../styles/tut_styles.css"

export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
        <NavComp/>
        <div className="tut-content">
          <h1 className="tut-title">{frontmatter.title}</h1>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} style={{ margin: "10px" }}/>
        </div>
    </div>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;