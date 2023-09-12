import comp_json from "../knowledge/comp_classes.json"



export function build_dict_from_json() {
    var comp_dict = {};
  
    for (var i = 0; i < comp_json['classes'].length; i++){
      var entry = comp_json['classes'][i];
      comp_dict[entry.name] = {id: entry.id, shortDescription: entry.shortDescription};
    }
  
    return comp_dict;
  }
  
  export function build_connectivities() {
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
  export function is_connected(cons, currents, n1, n2) {
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
  
  export function makeTitle(text){
    const container = document.createElement("pre");
    container.innerText = TextTrackList;
    return container;
  }


  export function getGraphOptions() {
    return {
        width: "100%",
        height: "650px",
    
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
          tooltipDelay: 100,
        },
    
        layout: {
          hierarchical: {
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
          }
        },
      };
  }

  export function recentreGraph(graph) {
    graph.fit({animation:{duration:450, easingFunction:"easeInOutQuad"}});
  }