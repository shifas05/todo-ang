<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\TodoService;

class TodoController extends Controller
{
    public function __construct(TodoService $todoService) {
        $this->todoService = $todoService;
    }
    public function addTodo(Request $request) {
        return $this->todoService->addTodo($request->all());
    }
    public function getTodo() {
        return $this->todoService->getTodo();
    }
    public function editTodo(Request $request) {
        // dd($request->all());
        return $this->todoService->editTodo($request->all());
    }
    public function deleteTodo(Request $request){
        return $this->todoService->deleteTodo($request->all());
    }
}
