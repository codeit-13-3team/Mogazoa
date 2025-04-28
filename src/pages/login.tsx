import { useForm } from 'react-hook-form';
import { EmailInput, PasswordInput } from '@/components/input/loginInput';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <EmailInput register={register} errors={errors} type="login" />
        <PasswordInput register={register} errors={errors} type="login" />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          로그인
        </button>
      </form>
      <div className="flex justify-center  mt-4 text-gray-200">SNS로 바로 시작하기</div>
      <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-gray-100 text-white py-2 px-4 rounded">Google</button>
        <button className="bg-gray-100 text-white py-2 px-4 rounded">카카오톡</button>
      </div>
    </div>
  );
};

export default SignupPage;
