import { addNewTask, updateTask } from './server';

(async function myFunction() {
  await addNewTask({
    name: 'Another new task',
    id: '123456',
    group: 'G1',
    owner: 'U1',
    isComplete: false,
  });

  await updateTask({
    id: '123456',
    name: 'This is a better name',
  });
})();
