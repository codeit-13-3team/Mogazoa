import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Input from './input';

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type: 'login' | 'signup';
  watch?: (field: string) => string | undefined;
}

export const EmailInput = ({ register, errors, type }: Props) => {
  return (
    <>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: '유효한 이메일 형식을 입력해주세요.',
          },
        })}
        error={typeof errors.email?.message === 'string' ? errors.email?.message : undefined}
      />
    </>
  );
};

export const NameInput = ({ register, errors, type }: Props) => {
  return (
    <>
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        {...register('name', {
          required: '닉네임을 입력해주세요.',
          minLength: {
            value: 1,
            message: '닉네임은 최소 1자 이상이어야 합니다.',
          },
          maxLength: {
            value: 10, // 10자로 제한
            message: '닉네임은 최대 10자까지만 가능합니다.',
          },
        })}
        error={typeof errors.name?.message === 'string' ? errors.name?.message : undefined}
      />
    </>
  );
};

export const PasswordInput = ({ register, errors, type }: Props) => {
  return (
    <>
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength:
            type === 'signup'
              ? { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' }
              : undefined,
        })}
        error={typeof errors.password?.message === 'string' ? errors.password?.message : undefined}
      />
    </>
  );
};

export const ConfirmPasswordInput = ({ register, errors, watch }: Props) => (
  <Input
    label="비밀번호 확인"
    type="password"
    placeholder="비밀번호를 다시 입력하세요"
    {...register('confirmPassword', {
      required: '비밀번호 확인을 입력해주세요.',
      validate: (value) => value === watch?.('password') || '비밀번호가 일치하지 않습니다.',
    })}
    error={
      typeof errors.confirmPassword?.message === 'string'
        ? errors.confirmPassword?.message
        : undefined
    }
  />
);
