import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/panel_styles.css';
import 'vis-network/styles/vis-network.css';
import 'katex/dist/katex.min.css';

import comp_json from "../../knowledge/comp_classes.json"


import {build_connectivities, makeTooltip, is_connected} from "../utils"


import { CheckFormComp } from "../components/checkForm";
import { SidePaneComp } from "../components/sidePane";
import { GraphComp } from "../components/graph";

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

const IndexPage = () => {

  const graphRef = React.useRef();

  //comp_dict is a dictionary with comp classes and keys and other info as values
  //const comp_dict = build_dict_from_json();
  const comp_dict = comp_json.classes.reduce((dict, cls) => {
    const {
      name,
      shortDescription = null,
      informalDefinition = null,
      formalDefinition = null,
      extraInfos = [],
      includes = [],
    } = cls;
  
    dict[name] = {
      shortDescription,
      informalDefinition,
      formalDefinition,
      extraInfos,
      includes,
    };
  
    return dict;
  }, {});

  // connectivities is a list of outgoing arrows for every class
  const connectivities = build_connectivities();


  const [tickedNodes, setTickedNodes] = useState(["P", "NP", "BPP", "PSPACE", "EXP"]); //these are the default selected nodes for now
  const [selectedNode, setSelectedNode] = useState(""); //for keeping track of selection
  const [openPanel, setOpenPanel] = useState(false);
  const [graph, setGraph] = useState({nodes: [], edges: []});

  

  //gets selections from select box and draws the nodes and relevant edges
  const updateGraphDisplay = () => {

    //builds nodes from tickedNodes
    const display_nodes = [];
    for (const name in comp_dict) {
      if (tickedNodes.includes(name)) {
        display_nodes.push({ id: name, label: '*' + name + '*', title:makeTooltip(comp_dict[name].shortDescription) }); // makes label bold and tooltip shortdescription
        //display_nodes.push({ id: name, label: '*' + name + '*', title:comp_dict[name].shortDescription }); // makes label bold and tooltip shortdescription
      }
    }

   //gets relevant edges
    const display_edges = [];
    for (const n1 of display_nodes){
      for (const n2 of display_nodes){
          if(n1 !== n2 && is_connected(connectivities, tickedNodes, n1.id, n2.id)){
            //display_edges.push( {from:comp_dict[n1].id, to:comp_dict[n2].id});
            display_edges.push( {from:n1.id, to:n2.id});
          }
      }
    }

    //sets nodes and edges
    setGraph({
      nodes: display_nodes,
      edges: display_edges,
    });

  };
 
  const events = {
    selectNode: ({ nodes }) => {
      const node = nodes[0];
      //console.log("selected " + node);

      const tooltips = document.getElementsByClassName("vis-tooltip");
      if (tooltips.length === 1){
        const ttip = tooltips.item(0);
        ttip.style.visibility = 'hidden';
      }
      else if (tooltips.length > 1){
        console.warn("mutliple tooltips found, idk what do");
        console.log(tooltips);
      }

      graphRef.current.focus(node, {animation:{duration:450, easingFunction:"easeInOutQuad"}});

      setSelectedNode(node);
      setOpenPanel(true);
    },
    deselectNode: ({previousSelection}) => {
      //const node = previousSelection.nodes[0].id;
      //console.log("unselected " + node);
      setSelectedNode("");
      setOpenPanel(false);
    }
  };

  useEffect(() => {
    updateGraphDisplay(); // Update the graph when tickedNodes changes
  }, [tickedNodes]);


  //passed with name and checkedness of checkbox. If in tickedNodes remove, if not in tickedNodes appens
  const handleNodeCheckboxChange = (cls, checked) => {
    if (checked) {
      setTickedNodes((prevTickedNodes) => [...prevTickedNodes, cls]);
    } else {
      setTickedNodes((prevTickedNodes) =>
        prevTickedNodes.filter((item) => item !== cls)
      );
    }
  };



  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        The Problematic Table
        <br />
        <span style={headingAccentStyles}>— Complexity Theory, made simple.</span>
      </h1>
      <p>
        This is the basic map of what's known so far:
      </p>

     <CheckFormComp comp_dict={comp_dict} ticked={tickedNodes} changeFunc={handleNodeCheckboxChange}/>

      <br></br>

      <GraphComp graphRef={graphRef} graph={graph} events={events}/>

      <SidePaneComp openPanel={openPanel} comp_dict={comp_dict} selectedNode={selectedNode}/>
      
    </main>
    
  )
}


export default IndexPage

export const Head = () => <title>The Problematic Table</title>
