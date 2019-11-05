<?php

namespace App\Services;

use App\Models\Todo;

class TodoService {
    public function addTodo($data) {
        return Todo::create($data);
    }
    public function getTodo() {
        return Todo::all();
    }
    public function editTodo($data){
        $todo = Todo::find($data['id']);
        $todo->title = $data['title'];
        $todo->status_id = $data['status_id'];
        $todo->save();
        return $todo;
    }
}