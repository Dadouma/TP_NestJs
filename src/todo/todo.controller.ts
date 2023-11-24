import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion/upper-and-fusion.pipe';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  todos: Todo[];
  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedTodoDto) {
    console.log(mesQueryParams);
    return this.todoService.getTodos();
  }
  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.getTodoById(id);
  }
  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }
  @Delete(':id')
  deleteTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  modifyTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
    @Body() newTodo: Partial<AddTodoDto>,
  ) {
    return this.todoService.updateTodo(id, newTodo);
  }
  @Post('pipe')
  testPipe(@Body(UpperAndFusionPipe) data) {
    return data;
  }
}
