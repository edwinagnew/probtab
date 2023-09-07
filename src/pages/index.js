import * as React from "react"
import Graph from "react-graph-vis";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 500,
}
const headingAccentStyles = {
  color: "#663399",
  fontSize: "1.5rem",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
}

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

const links = []

const IndexPage = () => {
  const graph = {
    nodes: [
      { id: 1, label: "P", title: "node 1 tootip text" },
      { id: 2, label: "NP", title: "node 2 tootip text" },
      { id: 3, label: "BQP", title: "node 3 tootip text" },
      { id: 4, label: "PSPACE", title: "node 4 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 4 },
    ]
  };

  const options = {
    layout: {
      hierarchical: {
        direction: 'DU',        // UD, DU, LR, RL
        sortMethod: 'directed',  // hubsize, directed
      }
    },
    edges: {
      color: "#000000"
    },
    height: "750px"
  };
 
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        The Problematic Table
        <br />
        <span style={headingAccentStyles}>— Complexity Theory, made simple.</span>
      </h1>
      <p style={paragraphStyles}>
        This is the basic map of what's known so far:
      </p>

      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
