/**
 * diff新老节点，并修改老节点
 * @param oldNode 老节点
 * @param newNode 新节点
 */
import vnode from './vnode'
import sameNode from './sameNode'
import createElementDom from './createElementDom'
import patchVnode from '@/patchVnode'

/**
 * 比较新老根树节点
 * @param oldNode 老的树节点
 * @param newNode 新的树节点
 */
const patch = (oldNode, newNode) => {
  // 老节点没有sel,则认为非vnode, 此时创建为vnode
  if(!oldNode.selector) {
    console.log('oldNode dom 转vnode')
    oldNode = vnode(oldNode.tagName.toLowerCase(), undefined, undefined, undefined, oldNode)
  }
  // 如果两个节点相同
  if(sameNode(oldNode, newNode)) {
    patchVnode(oldNode, newNode)
  } else {
    console.log('不同节点，卸载老节点， 挂在新节点')
    // 如果两个节点不同, 移除老的节点，换上新的节点
    const newNodeDom = createElementDom(newNode)
    const parentNode = oldNode.element.parentNode
    if(parentNode) {
      parentNode.insertBefore(newNodeDom, oldNode.element)
      parentNode.removeChild(oldNode.element)
    }
    newNode.element = newNodeDom
  }
  // 返回新节点作为 old节点
  return newNode
}

export default patch
