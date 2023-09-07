import React, { useState, useEffect } from "react";
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

  const comp_dict = build_dict_from_json();

  const connectivities = build_connectivities(Object.keys(comp_dict));


  const [selectedNodes, setSelectedNodes] = useState(["P", "NP", "BQP", "PSPACE"]);


  const [graph, setGraph] = useState({nodes: [], edges: []});




  useEffect(() => { //should only get called once cos of empty dependencies...
    const nodeSelect = document.getElementById('nodeSelect');
    console.log(nodeSelect.childElementCount);
    if (nodeSelect.childElementCount === 0){
      for (const node_name in comp_dict) {
        const option = document.createElement('option');
        option.value = node_name;
        option.textContent = node_name;
        option.selected = selectedNodes.includes(node_name);
        nodeSelect.appendChild(option);
      }
      updateGraphDisplay(); //cheaky fix but whatever
    }
    
  }, []);
  

  const updateGraphDisplay = () => {
    const nodeSelect = document.getElementById('nodeSelect');
    const selectedOptions = Array.from(nodeSelect.selectedOptions).map(option => option.value);
    setSelectedNodes(selectedOptions);

    const display_nodes = [];
    for (const name in comp_dict) {
      if (selectedOptions.includes(name)) {
        display_nodes.push({ id: comp_dict[name].id, label: name });
      }
    }

   
    const display_edges = [];
    for (const n1 of display_nodes){
      for (const n2 of display_nodes){
          if(n1 !== n2 && is_connected(connectivities, selectedOptions, n1.label, n2.label)){
            display_edges.push( {from:comp_dict[n1.label].id, to:comp_dict[n2.label].id});
          }
      }
    }

    console.log(display_nodes);
    console.log(display_edges);

    setGraph({
      nodes: display_nodes,
      edges: display_edges,
    });

  };


  const options = {
    width: "60%",
    height: "500px",

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

    <select id="nodeSelect" onChange={updateGraphDisplay} multiple>
    </select>
    </main>
  )
}

function build_dict_from_json() {
  var comp_dict = {};

  for (var i = 0; i < comp_json['classes'].length; i++){
    var entry = comp_json['classes'][i];
    comp_dict[entry.name] = {id: entry.id, details: entry.details};
  }

  return comp_dict;
}

function build_connectivities(classes) {
  const edges = comp_json["relations"]["inclusions"];

  const cons = {};
  for (const e of edges){
    if (cons[e.from] === undefined){
      cons[e.from] = [];
    }
    cons[e.from].push(e.to);
  }

  return cons;
}

function is_connected(cons, currents, n1, n2) {
  if ( !(n1 in cons) || cons[n1] === []){
    return false;
  }
  if (n1 === n2 || cons[n1].includes(n2)){
    return true;
  }

  if (cons[n1].some( (n_mid) => currents.includes(n_mid))){ // if next level contains a connection, don't need to worry about any furthers 
    return false;
  }
  for (const n_mid of cons[n1]){
    if (!(currents.includes(n_mid)) && is_connected(cons, currents, n_mid, n2)){ // n_mid shouldnt be displayed, otherwise gets double arrow
      return true;
    }
  }

  return false;

}

export default IndexPage

export const Head = () => <title>Home Page</title>
