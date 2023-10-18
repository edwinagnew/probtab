import { graphql } from "gatsby";
import * as React from "react";
import { NavComp } from "../components/mainNav";
//import Layout from "../components/layout";

export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
        <NavComp/>
        <h1>{frontmatter.title}</h1>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
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