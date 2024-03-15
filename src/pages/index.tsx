import TabMonths from "@/components/transaction/TabsMonths";
import AuthLayout from "@/layouts/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>
      <div className="bg-white pt-2 rounded-md mt-20 shadow-md">
        <TabMonths />
      </div>
    </AuthLayout>
  );
}
