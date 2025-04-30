import { useForm } from 'react-hook-form';
import {
  EmailInput,
  NameInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '@/components/input/loginInput';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    console.log('회원가입 정보:', data);
  };

  return (
    <div className="items-center justify-center min-h-screen bg-black-500">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 max-w-sm mx-auto mt-10">
        <h1 className="text-xl font-bold font-">회원가입</h1>
        <EmailInput register={register} errors={errors} type="signup" />
        <NameInput register={register} errors={errors} type="signup" />
        <PasswordInput register={register} errors={errors} type="signup" />
        <ConfirmPasswordInput register={register} errors={errors} watch={watch} type="signup" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
