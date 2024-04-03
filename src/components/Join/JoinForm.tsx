import React from 'react';
import Button from '../AtomComponent/Button';
import Input from '../AtomComponent/Input';
import useJoin from '../../hooks/auth/useJoin';
import { PasswordRegTest, emailRegTest, isSame, isTrim, phoneNumberRegTest } from '../../util/Regs';
import { inputHandler } from '../../util/inputValue';
import { useNavigate } from 'react-router-dom';

const JoinForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setContirmPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const navigator = useNavigate();
  const { mutate, data, isPending } = useJoin();

  const FormItems = [
    {
      value: email,
      setValue: setEmail,
      type: 'email',
      placeholder: '이메일 형식에 맞춰 입력해주세요',
      name: '이메일',
      isReg: emailRegTest(email),
    },
    {
      value: password,
      setValue: setPassword,
      type: 'password',
      placeholder: '영문 숫자 특수기호 조합 8자리 이상',
      name: '비밀번호',
      isReg: PasswordRegTest(password),
    },
    {
      value: confirmPassword,
      setValue: setContirmPassword,
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      name: '비밀번호 확인',
      isReg: isSame(password, confirmPassword),
    },
    {
      value: displayName,
      setValue: setDisplayName,
      type: 'text',
      placeholder: '이름을 입력해주세요',
      name: '이름',
      isReg: isTrim(displayName),
    },
    {
      value: phoneNumber,
      setValue: setPhoneNumber,
      type: 'text',
      placeholder: '(-)를 빼고 전화번호를 입력해주세요',
      name: '전화번호',
      isReg: phoneNumberRegTest(phoneNumber),
    },
  ];

  const isJoinAble = () => {
    return !FormItems.some((FormItem) => {
      return FormItem.isReg === false;
    });
  };
  const activeJoin = isJoinAble();

  const handleJoin = () => {
    const joinData = {
      email: email,
      password: password,
      displayName: displayName,
      phoneNumber: phoneNumber,
    };
    mutate(joinData, { onSuccess: () => console.log('성공'), onError: () => console.log('에러') });
  };
  console.log(isPending);
  console.log(data);
  return (
    <form action='' className='flex flex-col gap-3 md:w-1/2 w-full pb-10'>
      {FormItems.map((FormItem, i) => {
        return (
          <Input
            key={i}
            label={FormItem.name}
            value={FormItem.value}
            onChange={(event) => {
              inputHandler({ event, setValue: FormItem.setValue });
            }}
            type={FormItem.type}
            maxLength={FormItem.value === phoneNumber ? 11 : undefined}
            alertMessage={FormItem.isReg ? undefined : FormItem.placeholder}
          />
        );
      })}
      {isPending ? 'true' : 'false'}
      <Button
        onClick={handleJoin}
        disabled={!activeJoin}
        label={'회원가입'}
        bg={activeJoin ? 'main' : 'disable'}
        className='mt-5'
      />
    </form>
  );
};
export default JoinForm;
