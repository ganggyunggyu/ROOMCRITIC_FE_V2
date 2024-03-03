import React, { useState } from 'react';

import Input from '../components/AtomComponent/Input';
import FormHeader from '../components/FormHeader';
import Button from '../components/AtomComponent/Button';
import ResponsiveProvider from '../components/WrapProvider/ResponsiveProvider';

import useJoin from '../hooks/auth/useJoin';
import { inputHandler } from '../util/inputValue';
import { emailRegTest, isSame, isTrim, PasswordRegTest, phoneNumberRegTest } from '../util/Regs';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setContirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { submitJoin, data } = useJoin({
    email: email,
    password: password,
    displayName: displayName,
    phoneNumber: phoneNumber,
  });

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

  return (
    <ResponsiveProvider direction={'col'}>
      <FormHeader text={'회원가입'} />
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (activeJoin) {
                    submitJoin();
                  }
                }
              }}
            />
          );
        })}
        {data && <p className='pt-3 text-red-400'>{data}</p>}
        <Button
          onClick={submitJoin}
          disabled={!activeJoin}
          label={'회원가입'}
          bg={activeJoin ? 'main' : 'disable'}
          // text={'white'}
          className='mt-5'
        />
      </form>
    </ResponsiveProvider>
  );
}
