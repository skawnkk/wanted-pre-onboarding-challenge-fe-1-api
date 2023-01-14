import React from 'react';
import {useSetRecoilState} from 'recoil';
import Button from '../atomic/Button';
import {useInput} from '../hooks/useInput';
import {todo} from '../pages/api/todo';
import useUpdate from '../react-query/useUpdate';
import {detailStateAtom, POST_STATE} from '../recoil/atoms/state';

interface IEditTodoForm {
  todo: todo;
}
function EditTodoForm({ todo }: IEditTodoForm) {
  const setState = useSetRecoilState(detailStateAtom);
  const { value: editTitle, onChange: onEditTitleChange, onInitial: onInitialEditTitle } = useInput(todo.title);
  const { value: editContents, onChange: onEditContentsChange, onInitial: onInitialEditContents } = useInput(todo.content);
  const { mutate : updateTodo } = useUpdate({ id: todo.id, onSuccess: () => setState(POST_STATE.READ) });

  const handleCancel = () => {
    onInitialEditTitle();
    onInitialEditContents();
    setState(POST_STATE.READ);
  };

  const handleEditConfirm = () => {
    updateTodo({title: editTitle, content: editContents});
  }

  return (
    <div className={'mx-5 mb-5'}>
      <input
        className={'block w-full h-12 px-3 rounded-lg'}
        value={editTitle}
        onChange={onEditTitleChange}
        placeholder={'제목을 입력해주세요'}
      />
      <textarea
        className={'block w-full mt-3 p-3 rounded-lg'}
        value={editContents}
        onChange={onEditContentsChange}
        placeholder={'할일을 자세히 입력해보세요'}
      />
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
