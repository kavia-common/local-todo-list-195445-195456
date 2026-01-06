#!/bin/bash
cd /home/kavia/workspace/code-generation/local-todo-list-195445-195456/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

