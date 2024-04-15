import { KeyboardEvent } from 'react';
import Button from '../AtomComponent/Button';
import Input from '../AtomComponent/Input';
import { useNavigate } from 'react-router-dom';
import { passwordRegTest, emailRegTest } from '../../util/regs';
import useLogin from '../../hooks/auth/useLogin';
import useFormInput from '../../hooks/useFormInput';

const LoginForm = () => {
  const navigator = useNavigate();
  const { mutate, isError, error } = useLogin();
  const emailInput = useFormInput('');
  const passwordInput = useFormInput('');

  const LoginInputs = [
    {
      value: emailInput.value,
      onChange: emailInput.onChange,
      type: 'email',
      label: '이메일',
      isReg: emailRegTest(emailInput.value),
    },
    {
      value: passwordInput.value,
      onChange: passwordInput.onChange,
      type: 'password',
      label: '비밀번호',
      isReg: passwordRegTest(passwordInput.value),
    },
  ];

  const loginAble = () => {
    return !LoginInputs.some((FormItem) => {
      return FormItem.isReg === false;
    });
  };
  const isLoginAble = loginAble();

  const submitLogin = () => {
    const loginData = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    mutate(loginData);
  };
  const directJoin = () => {
    navigator('/join');
  };
  const handleEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitLogin();
    }
  };

  return (
    <form className='flex flex-col gap-5 md:w-1/2 w-full pb-10 transition-all'>
      {LoginInputs.map((FormItem) => {
        return (
          <Input
            key={FormItem.label}
            value={FormItem.value}
            type={FormItem.type}
            onChange={FormItem.onChange}
            onKeyDown={handleEnterKeyPress}
            label={FormItem.label}
          />
        );
      })}
      {isError && <p className='py-3 text-red-400'>{error.message}</p>}
      <Button
        label={'로그인'}
        bg={isLoginAble ? 'main' : 'disable'}
        disabled={!isLoginAble}
        onClick={submitLogin}
      />
      <Button label={'회원가입'} bg={'main'} onClick={directJoin} />
    </form>
  );
};

export default LoginForm;
