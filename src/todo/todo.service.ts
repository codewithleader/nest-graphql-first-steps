import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import type { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import type { FindAllArgs } from './dto/args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Espacio', done: true },
    { id: 3, description: 'Piedra del Poder', done: false },
  ];

  findAll(findAllArgs: FindAllArgs): Todo[] {
    const { isCompleted } = findAllArgs;
    if (isCompleted !== undefined) {
      return this.todos.filter((todo) => todo.done === isCompleted);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id: ${id} NOT FOUNT`);
    }
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.description = createTodoInput.description;
    this.todos.push(todo);
    return todo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const { description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id); // El metodo findOne de esta clase lanza la exception si no existe.
    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;
    // Actualizamos el array de to-dos
    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });
    // Retornamos el to-do actualizado
    return todoToUpdate;
  }

  delete(id: number): Boolean {
    // Verificar que exista el to-do
    this.findOne(id);
    // Eliminar el to-do
    this.todos = this.todos.filter((todo) => todo.id !== id);
    // Retornar true
    return true;
  }
}
