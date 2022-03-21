/**
 * 更新 新老节点的children
 */
import sameNode from "./sameNode";
import patchVnode from './patchVnode'
import createElementDom from './createElementDom'

const updateChildren = (parentElement, oldChildren, newChildren) => {
  // 使用4个指针，分别执行新老节点的首尾位置
  let oldStartIndex = 0
  let oldEndIndex = oldChildren.length - 1
  let newStartIndex = 0
  let newEndIndex = newChildren.length - 1
  let keyMap = null // 缓存
  // 循环
  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    const oldStartNode = oldChildren[oldStartIndex]
    const oldEndNode = oldChildren[oldEndIndex]
    const newStartNode = newChildren[newStartIndex]
    const newEndNode = newChildren[newEndIndex]
    // 四种比较策略
    // 1: oldStart -> newStart  2: oldEnd -> newEnd   3: oldStart -> newEnd  4: oldEnd -> newStart
    // oldStart -> newStart
    if(sameNode(oldStartNode, newStartNode)) {
      console.log('命中策略1 oldS = newS')
      patchVnode(oldStartNode, newStartNode)
      oldStartIndex++
      newStartIndex++
      continue
    }
    // oldEnd -> newEnd
    if(sameNode(oldEndNode, newEndNode)) {
      console.log('命中策略2 oldEnd = newEnd')
      patchVnode(oldEndNode, newEndNode)
      oldEndIndex--
      newEndIndex--
      continue
    }
    // oldStart -> newEnd
    if(sameNode(oldStartNode, newEndNode)) {
      console.log('命中策略3 oldStart = newEnd')
      patchVnode(oldStartNode, newEndNode)
      parentElement.insertBefore(oldStartNode.element, oldEndNode.element.nextSibling)
      oldStartIndex++
      newEndIndex--
      continue
    }
    // oldEnd -> newStart
    if(sameNode(oldEndNode, newStartNode)) {
      console.log('命中策略4 oldEnd = newStart')
      patchVnode(oldEndNode, newStartNode)
      parentElement.insertBefore(oldEndNode.element, oldStartNode.element)
      oldEndIndex--
      newStartIndex++
      continue
    }
    // 其余没有命中优化策略
    console.log('未命中优化策略')
    if(!keyMap) {
      // 缓存oldStart -> oldEnd中所有节点
      keyMap = {}
      for(let i = oldStartIndex; i <= oldEndIndex; i++) {
        const key = oldChildren[i]?.data?.key
        if(key) {
          keyMap[key] = i
        }
      }
    }
    // 如果当前 newStart存在于keyMap中，则移动
    const currentKey = newChildren[newStartIndex]?.data?.key
    if(currentKey && keyMap[currentKey]) {
      const oldMoveNode = oldChildren[keyMap[currentKey]]
      patchVnode(oldMoveNode, newStartNode)
      // 移动该节点至初始节点之前， oldStart -> oldEnd中的节点都将被删除
      parentElement.insertBefore(oldMoveNode.element, oldStartNode.element)
      oldChildren[keyMap[currentKey]] = undefined
    } else {
      // 新增元素，插入到首个元素之前
      parentElement.insertBefore(createElementDom(newStartNode), oldStartNode.element)
    }
    newStartIndex++
  }
  // 新children还有剩余，执行插入操作
  if(newStartIndex <= newEndIndex) {
    // 结尾标识
    const endNode = newChildren[newEndIndex + 1]
    // 往结尾节点
    for(let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(createElementDom(newChildren[i]), endNode?.element)
    }
  } else {
    // oldChildren还有剩余，执行删除操作
    for(let i = oldStartIndex; i <= oldEndIndex; i++) {
     const oldDom = oldChildren[i]?.element
     if(oldDom) {
       parentElement.removeChild(oldDom)
     }
    }
  }
}



export default updateChildren
