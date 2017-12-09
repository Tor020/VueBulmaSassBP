// HTML
  <div class='layer'>

    <div class="root">

      <!-- v-bind:disabled="{'switch':false}" -->
      <!-- A reference is automatically created in the window for the id which is why you can reference it in js without selecting it -->
      <button id='btn1' @click='off1'> {{ btn1Text }}</button>
      <button id='btn2' @click='off2'> {{ btn2Text }}</button>
      <!--if the expression is truthy, the class is set to is-loading -->
      <!-- Manually setting the value of is loading to something will turn the text red empty, string is false -->
      <h2 :class="{'is-loading': isLoading }" @click="this.toggleClass"> wat </h2>

      <!-- Binds whatever is in the data object to that attribute -->
      <button v-bind:title="title">{{text}}</button>
      <!-- equivalent to :title (shorthand)  -->

    </div>
  </div>


// Javascript
let root = new Vue({
  el:".root",

  data: {
    isLoading:'',
    title: 'Js Set the title',
    text:"yes",
    className:"red",
    btn1Text:'btn1',
    btn2Text:'btn2',
    btn1val:'',
    btn2val:''
  },

  methods: {
    toggleClass() {
      this.isLoading = true;
    },
  off1() {
    let action = () =>{
      btn2.disabled = false;
      this.btn2Text = "Switched On";
      btn2.focus();
    };

      this.btn1Text = 'Switched Off';
        // <!-- A reference is automatically created in the window for the id which is why you can reference it in js without selecting it -->
      btn1.disabled = true;
      (btn1.disabled ? action() : 'nope'); 
      
    },
  off2() {
    let action = () =>{
      btn1.disabled = false;
      this.btn1Text = "Switched On";
      btn1.focus();
    };
      this.btn2Text = 'Switched Off';
        // <!-- A reference is automatically created in the window for the id which is why you can reference it in js without selecting it -->
      btn2.disabled = true;
      (btn1.disabled ? action() : 'nope'); 

   
    }
  }


});



