
// Directives are special attributes with the v- prefix.  
// Ex: 'v-if' 'v-else' 'v-show' 'v-for'

//Components need to go above the vue instance.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

html
<progress-view inline-template> 

  <div> 
      <h1>Your Progress Through This Course Is {{completionRate}}%</h1>

      <p><button @click="completionRate += 10">Update Completion</p>
  </div>
</progress-view>


javascript
Vue.component('progress-view', {
  data(){
    return{completionRate:50};
  }
});

new Vue({
  el:'#root',
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 


//slots are just

js :<slot name ="title"></slot>

html-tag version: <div slot = "title">This is the title</div>
template version: <template slot = "title">This is the title</template>


within the larger template in the js <slot>default content</slot> you can overwrite this in the main html
this also works withs etting default content with named slots


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

//  Section 7 Component 3 Message


    <div id="root" class="container">
        <tabs>
            <tab name="About Us" :selected="true">
                <h1>Here is the content for the about us tab.</h1>
            </tab>

            <tab name="About Our Culture">
                <h1>Here is the content for the about our culture tab.</h1>
            </tab>

            <tab name="About Our Vision">
                <h1>Here is the content for the about our vision tab.</h1>
            </tab>
        </tabs>
    </div>

Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,

    data() {
        return { tabs: [] };
    },

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.href == selectedTab.href);
            });
        }
    }
});

Vue.component('tab', {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,

    props: {
        name: { required: true },
        selected: { default: false }
    },

    data() {
        return {
            isActive: false
        };
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected;
    },
});

new Vue({
    el: '#root'
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Section 9 Advanced message sending


  <div id="root">


    <coupon></coupon>



    <h1 v-if="couponApplied">yew deed it </h1>

  </div>

// https://laracasts.com/series/learn-vue-2-step-by-step/episodes/13 Refer to
// the comments here https://alligator.io/vuejs/global-event-bus/ Needs to be
// done this way https://gist.github.com/vzool/ee9c69eec164b1812efca0ab5075e586
// We'll talk more about folder structure in future episodes. Until then, put
// in an Event.js file, and either include it as a script tag, or import it as a
// module.

window.Event = new class {

  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this
      .vue
      .$emit(event, data);
  }

  listen(event, callback) {
    this
      .vue
      .$on(event, callback);
  }

}();

window.Event = new Vue(); //To communicate with Any other component means that we need to listen for an event on this particular instance. ???
// Shared event instance somehow this communicates with the parent Vue instance
// by declaring a windowEvent to be a new instance

Vue.component('coupon', {

  template: '<input placeholder="Enter Code" @blur="onCouponApplied()">',
  methods: {

    onCouponApplied() {
      // as alternative with utility class above, you can do Event.fire('applied')
      Event.$emit('applied');

    }
  }

});

new Vue({
  //Parent

  el: '#root',
  data: {
    couponApplied: false
  },

  created() {
    // as alternative with utility class above, you can do Event.fire('applied')
    // Event.listen('applied', () => console.log('responding'));

    Event.$on('applied', () => console.log('responding'));
  }

});

  // any vue instance can emit events this.$emit('applied'); //Emit events with
  // $emit this.$on('applied', function() {It can pass through any data required
  // as the 2nd argument example of callback that responds to the event});
  // //Listen for events with $on


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Section 5 Component 1 Message

Vue.component('tor-msg', {


props:['title', 'body'],  //the props part of the component refer to the types of properties that the component can accept

data(){
  return {
    isVisible:true
  }
},

// v-show =
// Do not hide this element if what's in here is truthy


  template:`
  <article class="message" v-show="isVisible">
  <div class="message-header">
    {{ title }}
    <!-- <button class="delete" aria-label="delete"></button> -->
    <button type="button" @click="hideModal" class ="button is-primary">-</button>
  </div>
  <div class="message-body">
   {{body}}
  </div>
</article>
`,
methods:{
  hideModal(){
    this.isVisible = false;  //only applies to the individual instance of the component
    
    //alternative you could just have the @click="isVisible =  false" within html
  }
}
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Section 4 Component Intro


//Relevant HTML

<div class='root'>
  <task-list>
  <task></task>
  </task-list>
</div>

Vue.component('task-list', {
  template: `
            <div>
              <task v-for="task in tasks"  :key = "task.id" >{{task.task}}</task>

            </div>`,
    
  //  Components can't have their data set to an object because it's not linked to any one individual object  
  //  data: {} vs data(){ return {} }
  //  so instead you make data equal to a function that returns an object    
            
  data(){
    return{
      tasks:[
         //This came into effect with vue 2.2.0. It's an easy fix. simply add the key via shortcut after the v-for like this: task v-for = "task in tasks" :key = "task.id" . and then add an id into the array for each task like this: { task: 'Go to the store', id: 1, complete: true },
        { id:0, task:'gettin\' stuff done', complete: true},
        { id:1, task:'am hungry', complete: false},
        { id:2, task:'am wanting to move out of this shithole', complete: true},
        { id:3, task:'am sorry about it', complete: false},
      ]
    }
  }
});

//This is one separate chunk that correlates to the bottom separate chunk.
 // Basically, "Vue.component('task-list')" is made up of "Vue.component('task')"s

Vue.component('task', {

    <slot> serve as content distribution outlets in component templates. <slot> itself will be replaced.
  template: '<li> <slot></slot>  </li>'

});


    let root = new Vue({
      el: ".root",
    });



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Section 8

Vue.component('coupon',{
  template: '<input placeholder="Enter Code" @blur="onCouponApplied()">',

  methods:{
    onCouponApplied(){
      this.$emit('applied'); /*   
      Child instance emits the event, but if nobody cares thats fine. The parent can respond to the event though and it does below with the console.log statement

     $emit The first argument passed in is the custom event that you're listening for.
      
      The 2nd argument in the $emit can be data that you want to pass with the event. Can be anything
      */
    }
  }
});

new Vue({
// Parent instance 

  el:'#root',

  methods:{
    onCouponApplied(){
      console.log('yey');
        this.couponApplied=true;
    }
  },
  data:{
    couponApplied:false
  }

});


