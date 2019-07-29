<template>
    <div class="tree2">
      <tree ref='tree2' :data='tree' :topMustExpand='false' :selectAlone='true' :tpl='tpl' @node-select="nodeCheck"/>
      <!-- <div v-for="(node, idx) in selectedItems" :key="idx" class="tree2_path">
        {{node.name}}
          <span @click.stop="delNode(node.id)" >x</span>
      </div> -->
    </div>
</template>

<script>
import Tree from './tree/tree'
export default {
  name: "treeRadio",  
	props: {
    tree: {
      type: Array,
      default: () => []
    },
    select:{
      type: Object
    }
  }, //指定传过来的参数
  data () {
    return {
      selectedItems:[],
      selects:this.select
      //treeList: this.tree
      //   [{
      //   deep:'1',
      //   title: 'node1',
      //   name: 'node1',
      //   id: '01',
      //   children: [{
      //     deep:'2',
      //     title: 'node 1-1',
      //     name: 'node1/node 1-1',
      //     id: '11',
      //     children: [{            
      //       deep:'3',
      //       title: 'node 1-1-1',
      //       name: 'node1/node 1-1/node 1-1-1',
      //       id: '111',
      //     }, {
      //       deep:'3',
      //       title: 'node 1-1-2',
      //       name: 'node1/node 1-1/node 1-1-2',
      //       id: '112',
      //     }, {
      //       deep:'3',
      //       title: 'node 1-1-3',
      //       name: 'node1/node 1-1/node 1-1-3',
      //       id: '113',
      //     }]
      //   }, {
      //     deep:'2',
      //     title: 'node 1-2',
      //     name: 'node1/node 1-2',
      //     id: '12',
      //     children: [{
      //       deep:'3',
      //       title: "node 1-2-1",
      //       name: 'node1/node 1-2/node 1-2-1',
      //       id: '121',
      //     }, {
      //       deep:'3',
      //       title: "node 1-2-2",
      //       name: 'node1/node 1-2/node 1-2-2',
      //       id: '122'
      //     }]
      //   }]
      // },{
      //   deep:'1',
      //   title: 'node2',
      //   name: 'node2',
      //   id: '02',
      //   children: [{
      //       deep:'2',
      //       title: "node 2-1",     
      //       name: 'node2 --> node 1-2-1',         
      //       id: '21',
      //   }]
      // },{
      //   deep:'1',
      //   title: 'node3',
      //   name: 'node3',
      //   id: '03'
      // }]
    }
  },
  methods: {
    // tpl (node, ctx, parent, index, props) {
    tpl (...args) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      node.parent = () => parent
      return <span>
         <span title={node.name+' ('+node.question_num+')'} class={titleClass} domPropsInnerHTML={node.name+' ('+node.question_num+')'} onClick={() => {
           this.$refs.tree2.nodeSelected(node)
         }}></span>
      </span>
    },
    nodeCheck(node) {      
      this.selectedItems=[];
      //清空所有选中记录
      this.kong();
      //选中当前知识点及父节点     
      this.$set(node, "selected", true);
      var ojb = {};
      ojb['id'] = node.id;
      ojb['name'] = node.name;
      this.selectedItems.push(ojb);
      this.$emit('update', ojb);
    },
    delNode (idx) {
      this.selectedItems=[];
      this.kong();
    },
    kong(id){//tree空处理
      let result = null;
      const findItemById = (list) => {
          list.some(e => {
            if(id != undefined && id != ''&&e.id == id){
              this.$set(e, "selected", true);
            }else{
              this.$set(e, "selected", false);
            }
            if (e.children) {
              result = findItemById(e.children);
              if (result) {
                  return true;
              } else {
                  return false;
              }
            }
          })
          return result;
      }    
      findItemById(this.tree)
    }
  },
  created() {
  },
components: {
    Tree
  }
}
</script>
<style>
.tree2{
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  height: 800px;
}
.halo-tree:first-child > li:before {
  border:none;
}
.halo-tree:first-child > li:after {
  border:none;
}
.tree-search-input{
  width: 70%;
  padding: 6px 8px;
  outline: none;
  border-radius: 6px;
  border:1px solid #ccc;
}
.tree-search-btn{
  width: 25%;
  padding: 6px 8px;
  outline: none;
  border-radius: 6px;
  background-color: rgb(218, 218, 218);
  border:1px solid rgb(226, 225, 225);
  color: rgb(117, 117, 117);
}
.tree2_path{
  padding-left: 12px;
}
</style>
