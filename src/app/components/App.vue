<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                <input type="text" class="form-control" placeholder="Insert a task" 
                                id="" v-model="task.title"> 
                                </div>
                                <div class="form-group">
                                <textarea class="form-control" id="" cols="30" rows="10" placeholder="Insert a description" 
                                v-model="task.description"></textarea>
                                </div>
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--<tr v-for="t of lTasks" v-bind:key="t">-->
                            <tr v-for="(t) of lTasks" :key="t.id">
                                <td>{{t.title}}</td>
                                <td>{{t.description}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="deleteTask(t._id)">
                                        Delete
                                    </button>
                                    <button class="btn btn-secondary" @click="editTask(t._id)">
                                    Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import { defineComponent } from '@vue/composition-api'
    
    class Task{

        constructor(title, description){

            this.title = title;
            this.description = description;
        }
    }

    export default {
    
        data(){
            return{
                task: new Task(),
                lTasks: [],
                edit: false,
                taskToEdit: ""
            }
        },

        created() {
            
            this.getTask();
        },

        methods: {

            addTask(){

                if(this.edit == false){

                    console.log("AÑADIR");
                    console.log(this.task);

                    fetch('/api/task', {

                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        },
                    })
                    .then(res => res.json())
                    //.then(data => {console.log(data)});
                    .then(data => {
                        this.getTask();
                    });
                }
                else{
                    fetch('/api/task/'+this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        },
                    })
                    .then(res => res.json())
                    //.then(data => {console.log(data)});
                    .then(data => {
                        this.getTask();
                        this.edit = false;
                    });
                }

                this.task = new Task();
            },

            getTask(){

                fetch('/api/task')
                    .then(res => res.json())
                    //.then(data => console.log(data));
                    .then(data => {

                        this.lTasks = data;
                        console.log(this.lTasks);
                    });
            },

            deleteTask(id){

                console.log("deleting "+id);

                fetch(`/api/task/${id}`, {

                    method: 'DELETE',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type' : 'application/json'
                    },
                })
                .then(res => res.json())
                //.then(data => console.log(data));
                .then(data => {
                    this.getTask();
                });
            },

            editTask(id){

                fetch('/api/task/'+id)
                    .then(res => res.json())
                    .then(data => {

                        this.task = new Task(data.title, data.description);
                        this.taskToEdit = data._id;
                        this.edit = true;
                    });
            }
        }
    }

</script>
