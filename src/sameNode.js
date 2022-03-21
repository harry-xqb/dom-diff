

const sameNode = (vnode1, vnode2) => {
  return  vnode1.selector === vnode2.selector && ((vnode1.data?.key === vnode2.data?.key))
}

export default sameNode
