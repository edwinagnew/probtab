import React, { useState, useEffect, useRef } from "react";
//import { Router, Route, Switch } from 'react-router-dom';
//import { Router, Link } from "@reach/router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'vis-network/styles/vis-network.css';
import 'katex/dist/katex.min.css';

import '../styles/panel_styles.css';


import comp_json from "../../knowledge/comp_classes.json"
import {build_connectivities, makeTooltip, is_connected} from "../utils"


import { CheckFormComp } from "../components/checkForm";
import  SidePaneComp from "../components/sidePane";
import { GraphComp } from "../components/graph";
import { ControlButtonComp } from "../components/controlPanel";

const IndexPage = () => {

  const graphRef = useRef();
  const sidePaneRef = useRef(null);

  //comp_dict is a dictionary with comp classes and keys and other info as values
  //const comp_dict = build_dict_from_json();
  const comp_dict = comp_json.classes.reduce((dict, cls) => {
    const {
      name,
      shortDescription = "",
      informalDefinition = "",
      formalDefinition = "",
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
  const [sidePaneWidth, setSidePaneWidth] = useState(0);

  //called when sidePane activated in order to get width of side pane to adjust focusing. Buggy - takes 2/3 selections to kick in. Doesnt need to change after so maybe redo...
  useEffect(() => {
    if (sidePaneRef.current) {
      // Update sidePaneWidth when the ref is available
      setSidePaneWidth(sidePaneRef.current.offsetWidth);
      //console.log('updated', sidePaneRef, sidePaneWidth);
    }
  }, [sidePaneRef.current]);

  useEffect(() => {
    updateGraphDisplay(); // Update the graph when tickedNodes changes
  }, [tickedNodes]);

  

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

      //window.history.pushState({}, '', '/#' + node);
      
      //hide tooltip (otherwise lingers)
      const tooltips = document.getElementsByClassName("vis-tooltip");
      if (tooltips.length === 1){
        const ttip = tooltips.item(0);
        ttip.style.visibility = 'hidden';
      }
      else if (tooltips.length > 1){
        console.warn("mutliple tooltips found, idk what do");
        console.log(tooltips);
      }
      

      
      //focus onto selected node with offset to account for side pane
      graphRef.current.focus(node, {
        animation:{duration:450, easingFunction:"easeInOutQuad"}, 
        offset: {x:-sidePaneWidth/4, y:0}
      });

      //sets global stuff
      setSelectedNode(node);
      setOpenPanel(true);
    },
    deselectNode: () => {
      closePanel();
    }
  };

  const closePanel = () => {
    //window.history.back();
    setSelectedNode("");
    setOpenPanel(false);
  };

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
      <main>

        <div className="everything-container">

        <ControlButtonComp graphRef={graphRef}/>

          {/* <Router>
            <GraphComp path="/" graphRef={graphRef} graph={graph} events={events}/>
            <SidePaneComp path="/classes/:node" openPanel={openPanel} comp_dict={comp_dict} selectedNode={selectedNode} closePanel={closePanel} sidePaneRef={sidePaneRef}/>
          </Router> */}

          <GraphComp graphRef={graphRef} graph={graph} events={events}/>
          <SidePaneComp openPanel={openPanel} comp_dict={comp_dict} selectedNode={selectedNode} closePanel={closePanel} sidePaneRef={sidePaneRef}/>
          

          <CheckFormComp comp_dict={comp_dict} ticked={tickedNodes} changeFunc={handleNodeCheckboxChange}/>

          
        </div>
        
      </main>
  )
}


export default IndexPage

export const Head = () => <title>The Problematic Table</title>
