import useFormInput from '../../../../shared/hooks/use-form-input';
import { isSame, isTrim } from '../../../../shared/lib/get-regs';
import { useNavigate } from 'react-router-dom';
import { isEmail, isPassword, isPhoneNumber } from '../../../../shared/lib';
import { useJoin } from '@/entities';
import { Button, Input } from '@/shared';

export const JoinForm = () => {
  const navigator = useNavigate();
  const { mutate, data, isSuccess } = useJoin();

  const [
    emailInput,
    passwordInput,
    confirmPasswordInput,
    displayNameInput,
    phoneNumberInput,
  ] = [
    useFormInput(''),
    useFormInput(''),
    useFormInput(''),
    useFormInput(''),
    useFormInput(''),
    useFormInput(''),
  ];

  const FormItems = [
    {
      value: emailInput.value,
      onChange: emailInput.onChange,
      type: 'email',
      placeholder: '이메일 형식에 맞춰 입력해주세요',
      name: '이메일',
      isReg: isEmail(emailInput.value),
    },
    {
      value: passwordInput.value,
      onChange: passwordInput.onChange,
      type: 'password',
      placeholder: '영문 숫자 특수기호 조합 8자리 이상',
      name: '비밀번호',
      isReg: isPassword(passwordInput.value),
    },
    {
      value: confirmPasswordInput.value,
      onChange: confirmPasswordInput.onChange,
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      name: '비밀번호 확인',
      isReg: isSame(passwordInput.value, confirmPasswordInput.value),
    },
    {
      value: displayNameInput.value,
      onChange: displayNameInput.onChange,
      type: 'text',
      placeholder: '이름을 입력해주세요',
      name: '이름',
      isReg: isTrim(displayNameInput.value),
    },
    {
      value: phoneNumberInput.value,
      onChange: phoneNumberInput.onChange,
      type: 'text',
      placeholder: '(-)를 빼고 전화번호를 입력해주세요',
      name: '전화번호',
      isReg: isPhoneNumber(phoneNumberInput.value),
    },
  ];

  const isJoinAble = () => {
    return !FormItems.some((FormItem) => {
      return FormItem.isReg === false;
    });
  };
  const activeJoin = isJoinAble();

  const handleJoin = () => {
    const joinUserDTO = {
      email: emailInput.value,
      password: passwordInput.value,
      displayName: displayNameInput.value,
      phoneNumber: phoneNumberInput.value,
    };
    mutate(joinUserDTO, {
      onSuccess: (result) => console.log(result),
      onError: (error) => console.error(error),
    });
  };

  if (isSuccess) {
    if (data.status === 200) navigator('/login');
  }
  return (
    <form className="flex flex-col justify-center gap-3 md:w-1/2 w-full pb-10">
      {FormItems.map((FormItem, i) => {
        return (
          <Input
            key={i}
            label={FormItem.name}
            value={FormItem.value}
            onChange={FormItem.onChange}
            type={FormItem.type}
            maxLength={FormItem.value === phoneNumberInput.value ? 11 : null}
            alertMessage={FormItem.isReg ? null : FormItem.placeholder}
          />
        );
      })}

      {isSuccess && <p className="text-red-400">{data.data.message}</p>}
      <Button
        onClick={handleJoin}
        disabled={!activeJoin}
        label={'회원가입'}
        variant={activeJoin ? 'main' : 'disable'}
        className="mt-5"
      />
    </form>
  );
};
