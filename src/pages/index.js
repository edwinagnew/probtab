import * as React from "react"
import Graph from "react-graph-vis";

import comp_json from '../../knowledge/comp_classes.json';

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

const IndexPage = () => {
  // TODO: make so its constantly updated by checklist of what you want to see...

  const curr_display = ["P", "NP", "BQP", "PSPACE"] // by defualt (will add way more)

  const comp_dict = build_dict_from_json();
  
  var display_nodes = [];
  for (const name in comp_dict){
    if (curr_display.includes(name)){
      display_nodes.push( {id: comp_dict[name].id, label:name})
    }
  }

  const inc_edges = comp_json["relations"]["inclusions"];
  var display_edges = [];
  for (var i = 0; i < inc_edges.length; i++ ){
    const edge = inc_edges[i];
    if (curr_display.includes(edge.from) && curr_display.includes(edge.to)){
      display_edges.push( {from: comp_dict[edge.from].id, to: comp_dict[edge.to].id}) //TODO: store edge.details somewhere else
    }
  }

  const graph = {
    nodes: display_nodes,
    edges: display_edges,
  };

  const options = {
    width: "60%",
    height: "400px",

    nodes: {
      font: {
        face: 'courier new',
      },

    },

    edges: {
      color: "#000000"
    },

    interaction: {
      hover: true,
      hoverConnectedEdges: false,
      navigationButtons: false, // doesn't seem to be working when true, but would be cool
      selectConnectedEdges: false,
      zoomSpeed: 0.7,
    },

    layout: {
      hierarchical: {
        direction: 'DU',        // UD, DU, LR, RL
        sortMethod: 'directed',  // hubsize, directed
      }
    },
  };
 
  const events = {
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

function build_dict_from_json() {
  console.log(comp_json);

  var comp_dict = {};

  for (var i = 0; i < comp_json['classes'].length; i++){
    var entry = comp_json['classes'][i];
    comp_dict[entry.name] = {id: entry.id, details: entry.details};
  }

  return comp_dict;

}

export default IndexPage

export const Head = () => <title>Home Page</title>
