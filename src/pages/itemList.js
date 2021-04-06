import React from "react";

let row = 0;
let column = -1;

function recurTrialAdd(index) {
}

// function recurTrialHori(listitem){
//   var isSimpleArray=true;
//   listitem.forEach(element => {
//     if (Array.isArray(element)){
//      isSimpleArray=false;
//     }
//   }); 

//   console.log("isSimpleArray",isSimpleArray);
//   if(isSimpleArray) return listitem.map((item, index)=><div className="Item" key={index}>item</div>)
//   return 
// }

function recur(listitem) {
  //  return <div className="itemColumns">{listitem.map((item, index) => (<div key={index}> {Array.isArray(item) ?  
  //     <div className="itemRow">{item[0]}{recur(item.slice(1))}</div>: item}</div>))}</div>
  return;

  //return <div className="itemColumns">{listitem.map((item, index) => (<div key={index}> {Array.isArray(item) ?  
  //  <div class="itemClass">{recur(item)}</div>: item}</div>))}</div>
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      parentId: props.parentId,
      level: props.level,
      //columnnum: props.columnnum,
      //rownum : props.rownum,
      //key: props.key
    };
  }

  handleClick = () => this.props.addChild()

  render() {
    return (
      <div className="Item" columnnum={this.props.columnnum.toString()} rownum={this.props.rownum.toString()} onClick={() => this.props.onClick()}>
        {this.props.title}
      </div>
    );
  }
}

// export a home page component
export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listitems: ["sa", ["b1", ["b2", "b3"], ["b4", "b4"]]],
      row: 0,
      column: 0
      //listitems: ["sa", ["b1", ["b2", "b3"], "b4"]]
      //listitems: ["sa", ["b1", ["b2","b2", "b3"], ["b4", "b4"]], "c"]
    };
    this.recurTrial = this.recurTrial.bind(this);
    this.addChild = this.addChild.bind(this);
    //this.recurTrial=this.recurTrial.bind(recurTrial);
  }

  recurTrial(listitem, isColumn = true) {
    // console.log(this.state.row);
    var isSimpleArray = true;
    listitem.forEach(element => {
      if (Array.isArray(element)) {
        isSimpleArray = false;
      }
    });
    if (isSimpleArray) {
      if (isColumn) {
        // this.state.column++;
        console.log('isSimpleArray: ');
        column++;
        let jsx = listitem.map((item, index) => this.renderItem(index, row + index, column, item));
        return jsx;
      }
      else {
        // this.state.row++;
        row++;
        let jsx = listitem.map((item, index) => this.renderItem(index, row, column + index, item));
        // return listitem.map((item, index) => this.renderItem(index, this.state.row, this.state.column + index, item))
        return jsx;
      }
    }

    //if(isSimpleArray) return <div className="itemColumns">{listitem.map((item, index) =><div className="item" key={index}>{item}</div>)}</div>
    //return <div className="itemColumns">{listitem.map((item, index) =><div className="itemRow" key={index}>{Array.isArray(item) ?  recurTrial(item): <div className="Item">{item}</div>}</div>)}</div>
    if (isColumn) {
      // this.setState({
      //   column: this.state.column+1
      // });
      // this.state.column++;
      column++;
      let jsx = <div className="itemColumns">{listitem.map((item, index) => <div className="itemRow" key={index}>{Array.isArray(item) ? this.recurTrial(item, false) : this.renderItem(index, row, column + index, item)}</div>)}</div>;
      return jsx;
      // return <div className="itemColumns">{listitem.map((item, index) => <div className="itemRow" key={index}>{Array.isArray(item) ? this.recurTrial(item, false) : this.renderItem(index, this.state.row, this.state.column + index, item)}</div>)}</div>
    }
    else {
      // this.setState({
      //   row: this.state.row+1
      // });
      row++;
      let jsx = <div className="itemRow">{listitem.map((item, index) => <div className="itemColumns" key={index}>{Array.isArray(item) ? this.recurTrial(item) : this.renderItem(index, row + index, column, item)}</div>)}</div>;
      // this.state.row++;
      return jsx;
      // return <div className="itemRow">{listitem.map((item, index) => <div className="itemColumns" key={index}>{Array.isArray(item) ? this.recurTrial(item) : this.renderItem(index, this.state.row + index, this.state.column, item)}</div>)}</div>
    }

    //  listitems: ["sa", ["b1", "b1"]]
    //  <div className="itemColumns">
    //    <div className="itemRow">
    //      <div className="Item">sa</div>
    //    </div>
    //    <div className="itemRow">
    //      <div className="Item">b1</div>
    //      <div className="Item">b1</div>
    //    </div>
    //  </div>

    // listitems: ["sa", [["b1", "b2"], "b1"]]
    // <div className="itemColumns">
    //   <div className="itemRow">
    //     <div className="Item">sa</div>
    //   </div>
    //   <div className="itemRow">
    //     <div className="itemColumns">
    //       <div className="Item">b1</div>
    //       <div className="Item">b2</div>
    //     </div>
    //     <div className="Item">b1</div>
    //   </div>
    // </div>

    //return <div className="itemColumns">{listitem.map((item, index) => (<div key={index}> {Array.isArray(item) ?  
    //  <div class="itemClass">{recur(item)}</div>: item}</div>))}</div>
  }

  addChild() {
    console.log('ds');
  }

  handleClick(row, column) {
    console.log('row, column: ', row, column);
    const listitems1 = this.state.listitems.slice();
    if(listitems1[row+1]){
      listitems1[row+1].push("ssdds");
    }
    else{
      //listitems1[row]=[listitems1, "ssdds"];
      // console.log('listitems1[row]: ', listitems1[row][column]);

      // listitems1[row][column]=["d", "fd"];
    }
    this.setState({ listitems: listitems1 });
    // this.setState({listitems: ["saddssd", ["b1", ["b2", "b3"], ["b4", "b4", "b4"]]]});
  }

  renderItem(index, row, column, item) {
    return (
      <Item
        key={index}
        rownum={row}
        columnnum={column}
        title={item}
        onClick={() => this.handleClick(row, column)}
      />
    );
  }

  render() {
    let jsx = <div className="listitem">
      {this.recurTrial(this.state.listitems)}
    </div>;
    row = 0;
    column = -1;
    return jsx;
  }
}
