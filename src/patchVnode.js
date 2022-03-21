/**
 * 两个相同节点的比较, 对当前vnode的子节点进行比较替换
 */
import createElementDom from "./createElementDom";
import updateChildren from './updateChildren'

const patchVnode = (oldVnode, newVnode) => {
  if(oldVnode === newVnode) {
    return
  }
  // 判断newVnode是否存在text, 并且没有children
  if(newVnode.text && !newVnode.children) {
    // 新老节点的text不同，则替换老节点的text
    if(newVnode.text !== oldVnode.text) {
      oldVnode.element.textContent = newVnode.text
    }
  } else {
    // 判断老节点是否存在children, 老节点存在children, 则需要比较children
    if(oldVnode.children) {
      // dom diff核心算法
      updateChildren(oldVnode.element, oldVnode.children, newVnode.children)
    } else {
      // 直接挂在 newVnode的children 到 oldVnode的children上
      // 清空oldVnode的内容
      oldVnode.element.innerHTML = ''
      // 修改oldVnode的dom 为newVnode生成的dom
      newVnode.children?.map(item => {
        const itemDom = createElementDom(item)
        oldVnode.element.appendChild(itemDom)
      })
    }
  }
  newVnode.element = oldVnode.element
}

export default patchVnode
