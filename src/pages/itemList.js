import React from "react";
import { Collapse } from "react-collapse";

function Item(props) {
  return (
    <div className="item" onClick={props.handleCollapse}>
      {props.isEditing || !props.title ? (
        <input
          type="text"
          value={props.title}
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          placeholder="Please enter the title"
          autoFocus
        />
      ) : (
        <span>{props.title}</span>
      )}
      <button className="add" onClick={props.addChild}>
        Add
      </button>
      <button className="edit" onClick={props.editChild}>
        Edit
      </button>
      <button className="delete" onClick={props.deleteChild}>
        Delete
      </button>
    </div>
  );
}

// export a home page component
export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [
        {
          id: 1,
          children: [],
          isEditing: true,
          isOpened: true,
          title: "",
        },
      ],
      numOfItemsGenerated: 1,
    };
    this.renderList = this.renderList.bind(this);
    this.renderChild = this.renderChild.bind(this);
    this.deleteChildren = this.deleteChildren.bind(this);
  }

  addChild(id, e) {
    e.stopPropagation();

    const newIndex = this.state.numOfItemsGenerated + 1;
    const listItems = this.state.listItems.slice();
    const index = listItems.findIndex((item) => item.id === id);
    listItems[index].isOpened = true;
    listItems[index].children.push(newIndex);
    this.setState({
      listItems: [
        ...listItems,
        {
          id: newIndex,
          title: "",
          children: [],
          isOpened: true,
          isEditing: true,
        },
      ],
      numOfItemsGenerated: this.state.numOfItemsGenerated + 1,
    });
  }

  deleteChild(id, listItems) {
    const index = listItems.findIndex((item) => item.id === id);
    if (listItems[index].children) {
      listItems[index].children.forEach((id) => {
        this.deleteChild(id, listItems);
      });
    }
    listItems.forEach((element) => {
      if (element.children.includes(id)) {
        element.children = element.children.filter((e) => e !== id);
      }
    });
    if (id === 1) {
      listItems[0].title = "";
    } else {
      listItems.splice(index, 1);
    }
    return listItems;
  }

  deleteChildren(id) {
    let listItems = this.state.listItems.slice();
    listItems = this.deleteChild(id, listItems);
    this.setState({
      listItems: listItems,
    });
  }

  handleBlur(id, e) {
    const listItems = this.state.listItems.slice();
    const index = listItems.findIndex((item) => item.id === id);
    if (listItems[index].isEditing) {
      listItems[index].isEditing = false;
      this.setState({
        listItems: listItems,
      });
    }
  }

  handleChange(id, e) {
    const listItems = this.state.listItems.slice();
    const index = listItems.findIndex((item) => item.id === id);
    listItems[index].title = e.target.value;
    if (!listItems[index].isEditing) {
      listItems[index].isEditing = true;
    }
    this.setState({
      listItems: listItems,
    });
  }

  handleCollapse(id, e) {
    if (e.target.tagName !== "INPUT") {
      const listItems = this.state.listItems.slice();
      const index = listItems.findIndex((item) => item.id === id);
      listItems[index].isOpened = !listItems[index].isOpened;
      this.setState({
        listItems: listItems,
      });
    }
  }

  editChild(id, e) {
    e.stopPropagation();
    const listItems = this.state.listItems.slice();
    const index = listItems.findIndex((item) => item.id === id);
    listItems[index].isEditing = !listItems[index].isEditing;
    this.setState({
      listItems: listItems,
    });
  }

  renderChild(children) {
    return (
      <div className="itemsSibling">
        {this.state.listItems
          .filter((item) => children.includes(item.id))
          .map((item) => (
            <div className="itemsColumn" key={item.id}>
              {this.renderItem(item)}
              {item.children && (
                <Collapse isOpened={item.isOpened}>
                  {this.renderChild(item.children)}
                </Collapse>
              )}
            </div>
          ))}
      </div>
    );
  }

  renderList() {
    const firstItem = this.state.listItems[0];

    return (
      <div className="itemsColumn">
        {this.renderItem(firstItem)}
        <Collapse isOpened={firstItem.isOpened}>
          {this.renderChild(firstItem.children)}
        </Collapse>
      </div>
    );
  }

  renderItem(item) {
    return (
      <Item
        title={item.title}
        isEditing={item.isEditing}
        addChild={this.addChild.bind(this, item.id)}
        deleteChild={() => this.deleteChildren(item.id)}
        editChild={this.editChild.bind(this, item.id)}
        handleBlur={this.handleBlur.bind(this, item.id)}
        handleChange={this.handleChange.bind(this, item.id)}
        handleCollapse={this.handleCollapse.bind(this, item.id)}
      />
    );
  }

  render() {
    return (
      <div className="itemListPage">
        <header>
          <h1>React Exercise</h1>
          <p>Posted by Yung Wing Wa</p>
        </header>
        <div className="listitem">{this.renderList()}</div>
      </div>
    );
  }
}
