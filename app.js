new Vue({
  el: '#app',
  data() {
    return {
      todoList: [
        {"id":0,"title":"Task number 1: List down your tasks for today"},
      ],
      new_todo: '',
    };
  },
  created() {
    // Uncomment for rerunning purposes
    // localStorage.clear();
    this.getTodos();
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList));
      }
    }
  },
  methods: {
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list'));
      }
    },
    addTask() {
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: 'Task number '+ (this.todoList.length+1) + ': ' + this.new_todo
        });
      }
      this.new_todo = '';
      return true;
    },
    removeLatest(task){
      Vue.delete(this.todoList, 0);
    },
    deleteTask(task) {
      this.todoList.splice(this.todoList.indexOf(task), 1);
    },
    clearAll() {
      this.todoList = [];
    }
  },
  computed:{
    today: function() {
      var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      }
      if(mm<10) {
        mm = '0'+mm
      }
      today = {
        day: weekday[today.getDay()],
        date:  dd + '-' + mm + '-' + yyyy,
      }
      return(today);
    }
  },
});
