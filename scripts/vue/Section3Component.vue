// HTML

  <div class='layer'>
    <div class="root">
      <!-- Can put any expression into the attribute with a v-directive  here -->
      <h1>  
        {{ reversedMessage }}
      </h1>
      <h2>All Tasks</h1>
      <ul>
      <!-- pass in task and key into the button  -->
        <li v-for="(task, i) in tasks" >      
      <!--v-text="task.description" breaks the button so isn't used-->
        {{ task.description }}
        <button :class="{ 'completed' : task.completed, 'incompleted': !task.completed }" @click="swetch(i)">o</button>
      </li>
    </ul>

      <h2>Incomplete Tasks</h1>
      <ul>
        <li v-for="task in incompleteTasks" v-text="task.description"></li>
      </ul>

      <h2>Complete Tasks</h1>
        <ul>
          <li v-for="task in completeTasks" v-text="task.description"></li>
        </ul>

  </div>
<!-- Better way Way more efficient. Dunno what v-model does yet -->
  <div id="tasks">
      <h2>All Tasks</h2>
      <ul>
        <li v-for="task in tasks"><input type="checkbox" v-model="task.completed"/>{{ task.description }}</li>
      </ul>
    
      <h2>Incomplete Tasks</h2>
      <ul>
        <li v-for="task in incompleteTasks" v-text="task.description"></li>
      </ul>
    
      <h2>Complete Tasks</h2>
      <ul>
        <li v-for="task in completeTasks" v-text="task.description"></li>
      </ul>
  </div>


  </div>


// Javascript


let root = new Vue({
  el:".root",

  data: {
      message:'Hello World',
      tasks:[
        {description:'Laugh at stuff', completed: false},
        {description:'Be angry at my living situation', completed: true},
        {description:'Be productive in solving the problem', completed: true},
        {description:'Eat food', completed: false},
        {description:'Meet with Client yet', completed: false},
        {description:'Solve own problems', completed: true}
      ]
    },
    //Methods are called with functionality added onto the html 
  methods: {
    //needs to pass in key to the function regardless. key is just the second value of for-In statement. i works
    swetch(i){
      // My Way uses ! 
      (this.tasks[i].completed = !this.tasks[i].completed);
        //if condition is true the operator returns value of expr1 otherwise the value of expr2
      console.log(i); //outputs yep as is
    },
    swwtch(key){
      //random guy way
      console.log(this.tasks[key].completed);
      (this.tasks[key].completed = this.tasks[key].completed ? false : true) ;
      console.log(this.tasks[key].completed);
    }
  },
  //Computed methods are called automatically. 
  computed:{ 
    //When the reversedMessage is written in the HTML the computed method is automatically called
    reversedMessage() {
      return this.message.split().reverse().join();
    },

    //filtered version of data.tasks array that don't have their property set to completed
    incompleteTasks() {  
      return this.tasks.filter(task => ! task.completed);
      // this.tasks.filter(function(task){
      //   return ! task.completed;
      // });
    },
    completeTasks(){
      return this.tasks.filter(task => task.completed);
    },
  
  }


});
//<!-- Better way Way more efficient. Dunno what v-model does yet (in html) -->
let app = new Vue({
	el: '#tasks',
	data: {
  	tasks: [
    	{ description: 'Go to the store', completed: true },
      { description: 'Finish the screencast', completed: false },
      { description: 'Make donation', completed: false },
      { description: 'Clear inbox', completed: false },
      { description: 'Make dinner', completed: false },
      { description: 'Clean room', completed: true }
    ]
  },
  computed: {
  	incompleteTasks() {
    	return this.tasks.filter(task => ! task.completed);
    },
    completeTasks() {
    	return this.tasks.filter(task => task.completed);
    }
  }
})

