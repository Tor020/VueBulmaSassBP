(function (window, document) {
  // body
  //Components need to go above the vue instance.
  Vue.component('modal', {
    // is-active is always applied because it isn't being regulated by the HTML dom
    template: `   
  <div class="modal is-active">
  <div class="modal-background" @click="$emit('close')"></div>
  <div class="modal-content">
    <div class="box">
      <slot></slot>
    </div> 
  </div>
  <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
  </div>`
    // @click="$emit('close')" Custom event that corresponds to the modal in the html
    //@close="showModal = false"
  });

  Vue.component('tor-link', {
    props: ['linkhref', 'text'],
    template: ` 
  <li><a v-bind:href=linkhref>{{text}}</a></li>
  `
  });

  let root = new Vue({
    el: '#root' /*the element to bind this to*/,
    data: { 
      // When a Vue instance is created, it adds all the properties found in its data object to Vue’s reactivity system
      showModal: false,
      placeHolderString: '',
      placeHolderInteger: 0,
      placeHolderBoolean: false,
      placeHolderArray: [],
      placeHolderObj: {},
      placeHolderErrorRes: null
    },
    //Methods are called with functionality added onto the html
    methods: {},
    //Computed methods are called automatically.
    computed: {},

    //  //Instance Lifecycle Hooks
    /*  Don’t use arrow functions on an options property or callback such as created: () => console.log(this.a) 
        Since arrow functions are bound to the parent context, this will not be the */

    beforeCreate() {
      /*  Init and Injections & Reactivity  */
    },

    created() {
      /*  Init and Injections & Reactivity  */
      console.log('created function check is: ' + this.placeHolderInteger);
    },

    beforeMount() {
      /* before create root.$el and replace "root.el" with it */
    },

    mounted() {
      /*  create root.$el and replace "root.el" with it   */
    },

    beforeUpdate() {
      /*  When data changes but the virtual Dom hasn't re-rendered yet  */
    },

    updated() {
      /*   When data changes and the virtual Dom has re-rendered  */
    },

    beforeDestroy() {
      /*  Before Teardown watchers, child components and event listeners   */
    },

    destroyed() {
      /*  After Teardown watchers, child components and event listeners  */
    }
  });

  // $watch is an instance method
  root.$watch('a', function (newValue, oldValue) { });




})(window, document);