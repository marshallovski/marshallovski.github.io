/**
 @name fiple.js
 @description Mini library for creating websites
 @copyright (c) 2022 marshallovski
 @license MIT
 @version 1.1.4
 * Last updated: 09.10.2022
 */

'use strict';

const fiple = {
  root: document.body,
  async htmlError(desc) {
    document.body.innerHTML = `<style>.fiple_err{width:300px;height:auto;background-color:#333;color:#fff;text-align:center;display:block;margin:auto;font-family:sans-serif;border:2px solid red;border-radius:16px;padding:16px}.fiple_sub{color:#666;font-size:12px;margin-top:1em}.fiple_link{color:#1e90ff;text-decoration:none}.fiple_desc{margin-top:10px}</style><br><div class="fiple_err"><h1>Render Error</h1><p class="fiple_desc">${desc}</p><p class="fiple_sub">Powered by fiple.js</p></div>`;
  },
  async init(ctx) {
    if (!this.root)
      return this.htmlError('You must provide the root element.<br><a class="fiple_link" href="https://marshallovski.github.io/fiple/docs/?err=missingRootElem" target="_blank">Learn more</a>');

    if (!ctx[0] || ctx[0].length === 0)
      return this.htmlError('Render tree is empty.<br><a class="fiple_link" href="https://marshallovski.github.io/fiple/docs/?err=RtreeEmpty" target="_blank">Learn more</a>');
  },
  createComponent(componentName) {
    class CustomElement extends HTMLElement {
      connectedCallback() { }
    }

    return customElements.define(componentName, CustomElement);
  },
  async render(_ctx, _params = {}, _props = {}) {
    this.init(_ctx); // initialization, checking for root elements, etc.

    _ctx.forEach(el => {
      let elem = document.createElement(el.elem);
      const re = /<%([^%>]+)?%>/g; // regexp for <% %> in element content
      let match;

      while (match = re.exec(el.content))  // searching for variables in element content
        el.content = el.content.replace(match[0], _props[match[1]]); // replacing. example: "hello, {var}" will be replaced on "hello, _props.var"

      if (el.style) // checking for inline element styles
        Object.entries(el.style)
          .forEach(rule => elem.style[rule[0]] = rule[1]); // applying styles to element

      if (el.class) // checking for classes
        Object.entries(el.class)
          .forEach(cl => elem.classList.add(cl[1])); // adding classes (ex.: {...class: ['test', 'lol', 'hehe'] })

      if (el.events) // checking for events
        Object.entries(el.events)
          .forEach(ev => elem.addEventListener(ev[0], ev[1])); // adding event(s) to element

      if (el.id) elem.id = el.id; // adding an "id" attr to element, if present
      if (el.content) elem.innerHTML = el.content; // adding content to element
      this.root.append(elem); // adding element to root element

      const mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          console.log(mutation);
        })
      })

      mutationObserver.observe(this.root, {
        attributes: false,
        characterData: true,
        childList: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: true
      });
    });
  }
};