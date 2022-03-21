import vnode from './vnode'

/**
 *  创建虚拟节点 vnode的 h函数
 * @param selector 元素选择器
 * @param data  数据
 * @param children 子元素 （字符串，数字，h函数对象， h函数数组）
 * @returns {{data, children, selector, text, element}}
 */
const h = (selector, data, children) => {
  if(!selector || !data || !children) {
    throw new Error('请检查参数是否正确')
  }
  // 字符串vnode
  if(typeof children === 'string' || typeof children === 'number') {
    return vnode(selector, data, undefined, children, undefined)
  }
  // children为h函数数组
  if(Array.isArray(children)) {
    children.forEach(item => {
      if(!(typeof item === 'object' && item.selector)) {
        throw new Error('children为数组时只能传递h函数')
      }
    })
    return vnode(selector, data, children, undefined, undefined)
  }
  // 第三个参数为h()函数生成的vnode时，填充children为数组
  if(typeof children === 'object' && children.selector) {
    return vnode(selector, data, [children], undefined, undefined)
  }
}

export default h
