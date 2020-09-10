window.dom = {
  create(string) {
    const container = document.createElement("template"); //template可容纳任何标签，不会像div里不能容纳td标签
    container.innerHTML = string.trim(); //trim：去掉字符串两边的空格
    return container.content.firstChild;
  },
  /*增*/
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //在该节点的下一个节点前插入一个"下一个节点”
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent); //在node前面加一个节点，两节点为兄弟关系
    dom.append(parent, node); //在parent节点里加一个node子节点，现在两节点为父子关系
  },
  /*删*/
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //可以不返回
  },
  empty(node) {
    const { childNodes } = node; //const childNodes = node.childNodes  简写形式
    const array = [];
    // for (let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i]);
    //   array.push(childNodes[i]);
    // } //由于childNodes.length会实时改变，故不能用for遍历，改用while。
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild; //此时的firstChild是原来的二儿子
    }
    return array; //在删除后代的同时把后代push到一个数组内储存起来，以便后续调用（存档）
  },
  /*改*/
  attr(node, name, value) {
    //重载：根据参数个数不同写不同代码
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      console.log("innerText" in node);
      if ("innerText" in node) {
        //适配
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox,chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      //重载
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      //写入
      node.style[name] = value;
    } else if (arguments.length === 2) {
      //读取
      if (typeof name === "string") {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div,{color:'red'})
        const object = name; //name是Object的实例
        for (let key in name) {
          //node.style.border = ...
          //node.style.color = ...
          node.style[key] = name[key]; //key是变量，用中括号语法
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  /*查*/
  find(selector, scope) {
    //scope范围查找
    return (scope || document).querySelectorAll(selector);
  }, //如果有范围就在范围里找，没范围就在全部document里找
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node); //children是伪数组，首先把它变为数组
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //x存在且x的类型为文本
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i = 0;
    for (i; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
//或dom.create = function (){};
