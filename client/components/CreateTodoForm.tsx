import React from 'react';
import Button from '../atomic/Button';
import { useInput } from '../hooks/useInput';
import { useCreate } from '../react-query/useCreate';

function CreateTodoForm() {
  const { value: title, onChange: onChangeTitle, onInitial: onInitialTitle } = useInput();
  const { value: content, onChange: onChangeContent, onInitial: onInitialContent } = useInput();
  const { mutate: createTodo } = useCreate({
    onSuccess: () => {
      onInitialTitle();
      onInitialContent();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({ title, content });
  };

  return (
    <form className={'w-full p-5 bg-slate-100'} onSubmit={handleSubmit}>
      <input className={'block w-full h-12 px-3 rounded-lg'} value={title} onChange={onChangeTitle} placeholder="해야할 일을 메모해볼까요?"></input>
      <textarea className={'block w-full mt-3 p-3 rounded-lg'} value={content} onChange={onChangeContent} placeholder="자세히 작성해 봐요"></textarea>
      <Button className="btn-default">추가</Button>
    </form>
  );
}

export default CreateTodoForm;
