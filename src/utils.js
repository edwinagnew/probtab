
import { InlineTex } from "react-tex";
import comp_json from "../knowledge/comp_classes.json"

const FAKE_INFINITY = 100000;
const json_edges = comp_json["relations"]["inclusions"];

const complicatedness_dict = {
  0: "Trivial",
  1: "Easy",
  2: "Medium",
  3: "Hard"
}
  
  export function build_connectivities() {
    //const edges = comp_json["relations"]["old_inclusions"];
    const edges = comp_json["relations"]["inclusions"];
  
    const cons = {};
    for (const e of json_edges){
      if (cons[e.from] === undefined){
        cons[e.from] = [];
      }
      cons[e.from].push(e.to);
    }
  
    return cons;
  }

  export function build_weighted_connectivities() {
    //builds 2d dictionary 
  
    const cons = {};
    for (const e of json_edges){
      if (cons[e.from] === undefined){
        cons[e.from] = [];
      }
      cons[e.from].push(e);
    }
  
    return cons;
  }
  
  //checks whether n1 is (recursively) connected to n2. To prevent double arrow, currents is list of nodes that will be drawn
  export function is_connected_old(cons, currents, n1, n2) {
    //basic falsity check for n1 having no connections
    if ( !(n1 in cons) || cons[n1] == []){
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

  export function is_connected(cons, n1, n2){
    
    //basic falsity check for n1 having no connections
    if ( !(n1 in cons) || cons[n1] == []){
      return false;
    }
    //basic truth check that n1 is immediately connected to n2
    const neighbours = cons[n1].map(({ to }) => to);
    
    if (neighbours.includes(n2)){
      return true;
    }

    for (const n_mid of cons[n1]){
      
      if (is_connected(cons, n_mid.to, n2)){
        return true;
      } 
    }

    return false;
  }

  export function best_connect(all_cons, currents, n1, n2){
    
    //can assume that n1 -*> n2. Want to find best explanation of why, but not include any paths that go through currents
    var best_cost = FAKE_INFINITY;
    var best_path = [];

    for (const connection of all_cons[n1]){ 
      if (connection.to === n2 && connection.complicatedness < best_cost){ //if directly connected, keep track of direction connection
        best_cost = connection.complicatedness;
        best_path = [connection];
      }

      else if (is_connected(all_cons, connection.to, n2)){ //if recursively connected, add connection to recursive best path
        
        if( currents.includes(connection.to)){
          //console.log("prevented mid curr", connection);
          return [[], -FAKE_INFINITY];
        }
        
        const [mid_cons, mid_cost] = best_connect(all_cons, currents, connection.to, n2);
        if (connection.complicatedness + mid_cost < best_cost){
          best_cost = connection.complicatedness + mid_cost;
          best_path = [connection, ...mid_cons];
        }
      }
    }
    return [best_path, best_cost];
  }


  export function getGraphOptions() {
    return {
        width: "100%",
        height: "100%",
    
        nodes: {
          font: {
            face: 'courier new',
            size: 16,
            multi: 'markdown',
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
          tooltipDelay: 200,
          keyboard: true
        },
    
        layout: {
          hierarchical: {
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
          }
        },
        physics: {
          solver: "hierarchicalRepulsion",
          hierarchicalRepulsion: {
            
            springLength: 250
          }
        }
      };
  }

  export function recentreGraph(graph) {
    graph.fit({animation:{duration:450, easingFunction:"easeInOutQuad"}});
  }


  export function makeTooltip(text){
    //https://visjs.github.io/vis-network/examples/network/other/html-in-titles.html
    //const container = document.createElement("pre");
    //container.innerText = text;
    //return container;
    
    return text;
  }

  export function makeTexSafe(text){
    return text.replace('#', '\\#') // backslashs cause issues but need for P^{#P} -> P^{\\#P}. might need to add more stuff later
  }