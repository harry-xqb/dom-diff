/**
 * 创建元素节点
 * @param vnode 虚拟dom
 */
const createElementDom = (vnode) => {
  const dom = document.createElement(vnode.selector)
  // 如果vnode存在text, 且不存在 children, 则设置dom的内容为text
  if(vnode.text && !vnode.children?.length) {
    dom.textContent = vnode.text
  } else if(vnode.children?.length){
   // 如果存在children，遍历并创建子元素，
    vnode.children.forEach(item => {
      dom.appendChild(createElementDom(item))
    })
  }
  vnode.element = dom
  return dom
}

export default createElementDom
