import React from 'react';
import { useForm } from 'react-hook-form';

type PersonScore = {
  name: string;
  email: string;
  score: number;
};

const TestForm: React.FC = ({}) => {
  const { register, handleSubmit } = useForm<PersonScore>();

  const onSubmit = (data: PersonScore): void => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={register} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={register} />
      </div>
      <div className="field">
        <label htmlFor="score">Score</label>
        <input type="number" id="score" name="score" ref={register} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};
export default TestForm;
