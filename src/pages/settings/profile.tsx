import FormProfile from "@/components/profile/FormProfile";
import SettingLayout from "@/components/setting/SettingLayout";
import AuthLayout from "@/layouts/AuthLayout";

export default function Home() {
  return (
    <AuthLayout hideTransaction>
      <SettingLayout>
        <h1 className="text-3xl text-green-500 font-bold leading-7">
          Profile User
        </h1>
        <FormProfile />
      </SettingLayout>
    </AuthLayout>
  );
}
