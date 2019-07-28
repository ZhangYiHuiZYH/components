import VTree from './tree.vue'
import VSelectTree from './selectTree.vue'
VTree.install = function (Vue) {
  Vue.component('VTree', VTree)
}

VSelectTree.install = function (Vue) {
  Vue.component('VSelectTree', VSelectTree)
}

export { VTree, VSelectTree }

export default VTree
