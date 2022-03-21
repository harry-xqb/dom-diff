/**
 *  vnode
 * @param selector 选择器
 * @param data 数据
 * @param children 子节点
 * @param text 文本
 * @param element 元素
 */
const vnode = (selector, data, children, text, element) => {
  return {
    selector,
    data,
    children,
    text,
    element
  }
}

export default vnode
