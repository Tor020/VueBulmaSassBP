
(function (window, document) {
      // body

      Vue.component('bulma-table', {
      template: 
      `   
      <table class="table">
      <thead>
      <tr>
      <th>Title 1</th>
      <th>Team</th>
      <th>Title 2</th>
      <th>Title 3</th>
      </tr>
      </thead>
      <tbody> 
        
  <table-Row a="pls"></table-Row>
    <tr class="is-selected">
    
    <td>
          <slot name  = "shoes"  ></slot>
    </td>
    <td>
          <slot name  = "title"  ></slot>
    </td>
    <td>
          <slot name  = "what"   ></slot>
    </td>
    <td>
          <slot name  = "what"   ></slot>
    </td>
    </tr>

    </tbody>
  </table>`,

    data() {
      return { data: [] };
  },
  created() {
      this.tabs = this.$children;
    console.log(this.$children); 
  }
});



  Vue.component('table-Row',{

    template:
    `
    <tr class="is-selected">
      <td @click="">
        {{weaponNumber1}}
      </td>
      <td>
        {{weaponNumber2}}
      </td>
      <td>
        {{weaponNumber3}}
      </td>
      <td>
        {{weaponNumber4}}
      </td>
    </tr>
    `,

    data(){
      return {
        data:{
          weaponNumber1:'',
          weaponNumber2:'',
          weaponNumber3:'',
          weaponNumber4:'',
          
        }
      };
    },

  });


    let root = new Vue({
      el: '#tableRoot',
      data:{
        weaponNumber1:'1',
        weaponNumber2:'2',
        weaponNumber3:'3',
        weaponNumber4:'4',
      },
      created() {
        // as alternative with utility class above, you can do Event.fire('applied')

      }
    });
   })(window, document);
