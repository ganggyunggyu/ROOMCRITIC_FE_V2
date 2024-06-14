import { KeyboardEvent } from 'react';
import { Button } from '../../../shared/ui';
import Input from '../../../shared/ui/Input';
import { useNavigate } from 'react-router-dom';
import useFormInput from '../../../shared/hooks/useFormInput';
import { isEmail, isPassword } from '../../../shared/lib';
import { Auth } from '../..';

export const LoginForm = () => {
  const navigator = useNavigate();
  const { mutate, isError, error } = Auth.H.useLogin();
  const [emailInput, passwordInput] = [useFormInput(''), useFormInput('')];

  const LoginInputs = [
    {
      value: emailInput.value,
      onChange: emailInput.onChange,
      type: 'email',
      label: '이메일',
      isReg: isEmail(emailInput.value),
    },
    {
      value: passwordInput.value,
      onChange: passwordInput.onChange,
      type: 'password',
      label: '비밀번호',
      isReg: isPassword(passwordInput.value),
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
  const testLogin = () => {
    const loginData = {
      email: 'test@test.com',
      password: 'test',
    };
    mutate(loginData);
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
        variant={isLoginAble ? 'main' : 'disable'}
        disabled={!isLoginAble}
        onClick={submitLogin}
      />
      <Button label={'테스트 로그인'} variant={'main'} onClick={testLogin} />
      <Button label={'회원가입'} variant={'main'} onClick={directJoin} />
    </form>
  );
};
