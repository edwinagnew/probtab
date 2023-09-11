import React, { useState, useEffect } from "react";
import Graph from 'react-graph-vis';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

import '../styles/panel_styles.css';

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

  const ref = React.useRef();

  //comp_dict is a dictionary with comp classes and keys and other info as values
  const comp_dict = build_dict_from_json();

  // connectivities is a list of outgoing arrows for every class
  const connectivities = build_connectivities();


  const [tickedNodes, setTickedNodes] = useState(["P", "NP", "BQP", "PSPACE"]); //these are the default selected nodes for now
  const [selectedNode, setSelectedNode] = useState(""); //for keeping track of selection
  const [openPanel, setOpenPanel] = useState(false);
  const [graph, setGraph] = useState({nodes: [], edges: []});



  //builds the select box based off classes in comp_dict
  useEffect(() => { //should only get called once cos of empty dependencies...
    const nodeSelect = document.getElementById('nodeSelect');
    if (nodeSelect.childElementCount === 0){
      for (const node_name in comp_dict) {
        const option = document.createElement('option');
        option.value = node_name;
        option.textContent = node_name;
        option.selected = tickedNodes.includes(node_name);
        nodeSelect.appendChild(option);
      }
      updateGraphDisplay(); //cheaky fix but whatever
    }
  }, []);
  

  //gets selections from select box and draws the nodes and relevant edges
  const updateGraphDisplay = () => {
    const nodeSelect = document.getElementById('nodeSelect');
    const selectedOptions = Array.from(nodeSelect.selectedOptions).map(option => option.value);
    setTickedNodes(selectedOptions);

    const display_nodes = [];
    for (const name in comp_dict) {
      if (selectedOptions.includes(name)) {
        display_nodes.push({ id: name, label: '*' + name + '*' }); // makes text bold
      }
    }

   
    const display_edges = [];
    for (const n1 of display_nodes){
      for (const n2 of display_nodes){
          if(n1 !== n2 && is_connected(connectivities, selectedOptions, n1.id, n2.id)){
            //display_edges.push( {from:comp_dict[n1].id, to:comp_dict[n2].id});
            display_edges.push( {from:n1.id, to:n2.id});
          }
      }
    }

    //console.log(display_nodes);
    //console.log(display_edges);

    setGraph({
      nodes: display_nodes,
      edges: display_edges,
    });

  };


  const options = {
    width: "100%",
    height: "500px",

    nodes: {
      font: {
        face: 'courier new',
        size: 16,
        multi: 'md',
      },
    },

    edges: {
      color: "#000000"
    },

    interaction: {
      hover: true,
      hoverConnectedEdges: false,
      selectConnectedEdges: false,
      navigationButtons: false, // doesn't seem to be working when true, but would be cool
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
    selectNode: ({ nodes }) => {
      const node = nodes[0];
      console.log("selected " + node);
      ref.current.focus(node, {animation:{duration:450, easingFunction:"easeInOutQuad"}});

      setSelectedNode(node);
      setOpenPanel(true);
    },
    deselectNode: ({previousSelection}) => {
      const node = previousSelection.nodes[0].id;
      console.log("unselected " + node);
      setOpenPanel(false);
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

      <select id="nodeSelect" onChange={updateGraphDisplay} multiple></select>
      <br></br>
      <div className='graph-border'>
        <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          ref.current = network;
        }}
        />
      </div>
      <SlidingPanel
        type="right"
        isOpen={openPanel}
        noBackdrop={true}
      >
        <div className="panel-container">
          <div>Name: {selectedNode}</div>
          {comp_dict[selectedNode] && (
          <div>Details: {comp_dict[selectedNode].details}</div>
          )}
        </div>
      </SlidingPanel>

      
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

function build_connectivities() {
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

//checks whether n1 is (recursively) connected to n2. To prevent double arrow, currents is list of nodes that will be drawn
function is_connected(cons, currents, n1, n2) {
  //basic falsity check for n1 having no connections
  if ( !(n1 in cons) || cons[n1] === []){
    return false;
  }
  //basic truth check that n1 is n2 or n1 is immediately connected to n2
  if (n1 === n2 || cons[n1].includes(n2)){
    return true;
  }

  //to avoid double arrow, checks whether there is some n_mid that will also be drawn and is (truly) connected to n2
  if (cons[n1].some( (n_mid) => currents.includes(n_mid) && is_connected(cons, [], n_mid, n2))){ 
    return false;
  }
  //checks whether theres an n_mid (not in currents) such that n1->n_mid-*>n2
  for (const n_mid of cons[n1]){
    if (!(currents.includes(n_mid)) && is_connected(cons, currents, n_mid, n2)){ // n_mid shouldnt be displayed, otherwise gets double arrow
      return true;
    }
  }

  return false;

}

export default IndexPage

export const Head = () => <title>Home Page</title>
