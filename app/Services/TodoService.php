<?php

namespace App\Services;

use App\Models\Todo;

class TodoService {
    public function addTodo($data) {
        return Todo::create($data);
    }
    public function getTodo() {
        return Todo::orderBy('created_at', 'desc')->get();
    }
    public function editTodo($data){
        $todo = Todo::find($data['id']);
        $todo->title = $data['title'];
        $todo->status_id = $data['status_id'];
        $todo->save();
        return $todo;
    }
    public function deleteTodo($data){
        // dd($data);
        $todo = Todo::find($data['id']);

        $dlt = $todo->delete();
        if($dlt) {
            return response()->json([
                'status' => 'success',
                'message' => 'successfully deleted!',
                'data' => $dlt
            ]);
        }
    }
    public function setLimit($data) {
        return Todo::orderBy('created_at', 'desc')->limit($data['limit'])->get();
    }
}