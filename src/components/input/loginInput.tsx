import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import Input from './input';
import { Eye, EyeOff } from 'lucide-react';

interface SignInForm {
  email: string;
  password: string;
}
interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
interface NickNameForm {
  nickname: string;
}
interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type: 'login' | 'signup';
  watch?: (field: string) => string | undefined;
  className?: string;
}
interface NickNameInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  className?: string;
  disabled?: boolean;
}

export const EmailInput = ({ register, errors, className }: Props) => {
  return (
    <>
      <Input
        label="이메일"
        type="email"
        className="w-[640px] h-[65px] py-1"
        placeholder="이메일을 입력하세요"
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '유효한 이메일 형식을 입력해주세요.',
          },
        })}
        error={typeof errors.email?.message === 'string' ? errors.email?.message : undefined}
      />
    </>
  );
};

export const NickNameInput = ({ register, errors, className }: NickNameInputProps) => {
  return (
    <>
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        {...register('nickname', {
          required: '닉네임을 입력해주세요.',
          minLength: {
            value: 1, // 1자 이상이어야 함
            message: '닉네임은 최소 1자 이상이어야 합니다.',
          },
          maxLength: {
            value: 10, // 10자로 제한
            message: '닉네임은 최대 10자까지만 가능합니다.',
          },
        })}
        error={typeof errors.nickname?.message === 'string' ? errors.nickname.message : undefined}
        className={className}
      />
    </>
  );
};

export const PasswordInput = ({ register, errors, type, className }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호를 입력하세요"
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength:
            type === 'signup'
              ? { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' }
              : undefined,
        })}
        error={typeof errors.password?.message === 'string' ? errors.password?.message : undefined}
        className={className}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-[45px] -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export const ConfirmPasswordInput = ({ register, errors, watch, className }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        label="비밀번호 확인"
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호를 다시 입력하세요"
        {...register('passwordConfirmation', {
          required: '비밀번호 확인을 입력해주세요.',
          validate: (value) => value === watch?.('password') || '비밀번호가 일치하지 않습니다.',
        })}
        error={
          typeof errors.passwordConfirmation?.message === 'string'
            ? errors.passwordConfirmation?.message
            : undefined
        }
        className={className}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-[45px] -translate-y-1/2 text-gray-400"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};
