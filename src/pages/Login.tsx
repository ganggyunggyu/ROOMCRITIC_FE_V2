import { useState } from 'react';
import FormHeader from '../components/FormHeader';
import Input from '../components/AtomComponent/Input';
import Button from '../components/AtomComponent/Button';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/auth/useLogin';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';
import { inputHandler } from '../util/inputValue';
import { PasswordRegTest, emailRegTest } from '../util/Regs';
import EyeIcon from '../icons/EyeIcon';

export default function Login() {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordType, setPasswordType] = useState('password');

  const { submitLogin, data } = useLogin({ email: email, password: password });
  const directJoin = () => {
    navigator('/join');
  };

  const toggleInputType = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password');
  };
  const LoginInputs = [
    {
      value: email,
      setValue: setEmail,
      type: 'email',
      label: '이메일',
      isReg: emailRegTest(email),
    },
    {
      value: password,
      setValue: setPassword,
      type: passwordType,
      label: '비밀번호',
      isReg: PasswordRegTest(password),
      button: {
        icon: <EyeIcon />,
        onClick: toggleInputType,
      },
    },
  ];

  const isLoginAble = () => {
    return !LoginInputs.some((FormItem) => {
      return FormItem.isReg === false;
    });
  };
  const activeLogin = isLoginAble();

  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'로그인'} />
      <form action='' className='flex flex-col gap-5 md:w-1/2 w-full pb-10 transition-all'>
        {LoginInputs.map((FormItem, i) => {
          return (
            <Input
              key={i}
              value={FormItem.value}
              type={FormItem.type}
              onChange={(event) => {
                inputHandler({ event, setValue: FormItem.setValue });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submitLogin();
                }
              }}
              label={FormItem.label}
              // @ts-expect-error
              button={FormItem.button}
            />
          );
        })}
        {data && <p className='py-3 text-red-400'>{data}</p>}
        <Button
          label={'로그인'}
          bg={activeLogin ? 'main' : 'disable'}
          disabled={!activeLogin}
          onClick={submitLogin}
        />
        <Button label={'회원가입'} bg={'main'} onClick={directJoin} />
      </form>
    </ResponsiveProvider>
  );
}
