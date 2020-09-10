const div = dom.create("div");

dom.after(test, div);

const div3 = dom.create(`<div>hi<div>`);
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log(nodes);
dom.empty(div);

dom.attr(test, "title", `hi`);
const title = dom.attr(test, "title");
console.log(`title: ${title}`);

dom.text(test, "新内容");

dom.style(test, { border: "1px solid red", color: "blue" });

dom.class.add(test, "red");
dom.class.remove(test, "red");
console.log(dom.class.has(test, "red"));

const fn = () => {
  console.log("111");
};
dom.on(test, "click", fn);
//dom.off(test, "click", fn);

const testDiv = dom.find("#test")[0];
console.log(testDiv);
console.log(dom.find(".red", testDiv)[0]);

dom.parent(test);
console.log(dom.siblings(dom.find("#s2")[0]));

console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
console.log(dom.each(dom.children(t), (n) => dom.style(n)));
