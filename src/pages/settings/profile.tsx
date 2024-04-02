import FormProfile from "@/components/setting/profile/FormProfile";
import SettingLayout from "@/components/setting/SettingLayout";
import AuthLayout from "@/layouts/AuthLayout";

export default function Profile() {
  return (
    <AuthLayout hideTransaction>
      <SettingLayout>
        <div className="flex items-center h-9">
          <h1 className="text-3xl text-green-500 font-bold leading-7">
            My Profile
          </h1>
        </div>
        <FormProfile />
      </SettingLayout>
    </AuthLayout>
  );
}
