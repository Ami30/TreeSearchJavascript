/**
* Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes,id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of children nodes.
    this.children = children; // All children are of type Node
    this.id=id;
  }

  
  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */

  
//This function contains a recursive function which takes selector, node and array as input and returns an array of id's if found.
  search(selector) {
    let FinalResultArray=[]
    FinalResultArray= this.recurse_search(selector,this,[]);
    if(FinalResultArray.length===0){
      console.log("Selecter not found.Array is empty:")
      return FinalResultArray
    }
    return FinalResultArray
  }
//This is the recursive function which is getting called again if root node has children. 
  recurse_search(selector,RootNode,resultarray){
    // if not value is passed in search function
    if(selector==null){
      return "No tag or class entered to search";
    }
    //This for loop will traverse through the root note and it's children.
    for(let i=0;i<RootNode.children.length;i++){

      if (selector===RootNode.children[i].tag){
        resultarray.push(RootNode.children[i].id);
      }

      if(RootNode.children[i].classes.includes(selector.slice(1,selector.length))){        
        resultarray.push(RootNode.children[i].id);
      }    
     //Called recursive function again if Rootnode has children
      if(RootNode.children.length>0){
        resultarray=this.recurse_search(selector,RootNode.children[i],resultarray)
      }
    }
    return resultarray
  }



}

let randomNode=new Node('span',[],['randomSpan'],'span-6');
let span5=new Node('span',[],['note','mania'],'span-5');
let span4=new Node('span',[],['mania'],'span-4');
let div4=new Node('div',[span4,span5],[],'div-4');
let label1= new Node('label',[],[],'lbl-1');
let section1=new Node('section',[label1],[],'sec-1');
let div3=new Node('div',[section1],['subContainer2'],'div-3');
let span3=new Node('span',[],['sub1-span3'],'span-3');
let p1=new Node('p',[],['sub1-p1','note'],'para-1');
let divNode2=new Node('div',[span3,p1],['subContainer1'],'div-2');
let span2=new Node('span',[],[],'span-2');
let span1=new Node('span',[],['note'],'span-1');
let divNode1=new Node('div',[span1,span2,divNode2,div3,div4],['mainContainer'],'div-1');
let body=new Node('body',[divNode1,randomNode],[],'content');


// Testing
console.log("Started...");
// Test case 1 -
console.log(divNode1.search("span"));
// Test case 2 -
console.log(divNode1.search(".note"));
// Test case 3 -
console.log(divNode1.search("label"));
// Test case 4 -
console.log(p1.search(".note"));
// Test case 5 -
console.log(divNode1.search("div"));
// Test case 6 -
console.log(randomNode.search("div"));
// Test case 7 -
console.log(divNode2.search("section"));
// Test case 8 -
console.log(body.search());
// Error conditions need to be handled
// invalid input need to be handled
// Test case 9 -
console.log(body.search("section"));
// Test case 10 -
console.log(divNode1.search(".randomSpan"));
// randomSpan is some Span outside your divNode1 closed