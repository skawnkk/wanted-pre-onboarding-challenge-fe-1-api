import React from 'react';
import { useSetRecoilState } from 'recoil';
import Button from '../atomic/Button';
import { useInput } from '../hooks/useInput';
import { todo } from '../pages/api/todo';
import useUpdate from '../react-query/useUpdate';
import { detailState } from '../recoil/atoms/state';

interface IEditTodoForm {
  todo: todo;
}
function EditTodoForm({ todo }: IEditTodoForm) {
  const setState = useSetRecoilState(detailState);
  const { value: editTitle, onChange: onEditTitleChange, onInitial: onInitialEditTitle } = useInput(todo.title);
  const { value: editContents, onChange: onEditContentsChange, onInitial: onInitialEditContents } = useInput(todo.content);
  const { updateTodo } = useUpdate({ id: todo.id, onSuccess: () => setState('read') });

  const handleCancel = () => {
    onInitialEditTitle();
    onInitialEditContents();
    setState('read');
  };

  const handleEditConfirm = () => updateTodo({ title: editTitle, content: editContents });

  return (
    <div className={'mx-5 mb-5'}>
      <input
        className={'block w-full h-12 px-3 rounded-lg'}
        value={editTitle}
        onChange={onEditTitleChange}
        placeholder={'제목을 입력해주세요'}
      ></input>
      <textarea
        className={'block w-full mt-3 p-3 rounded-lg'}
        value={editContents}
        onChange={onEditContentsChange}
        placeholder={'할일을 자세히 입력해보세요'}
      ></textarea>
      <div className="flex gap-2">
        <Button className="btn-slate-600" onClick={handleCancel}>
          취소
        </Button>
        <Button className="btn-default" onClick={handleEditConfirm}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default EditTodoForm;
