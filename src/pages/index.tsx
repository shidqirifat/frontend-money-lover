import Summary from "@/components/transaction/Summary";
import TabMonths from "@/components/transaction/TabsMonths";
import NoTransaction from "@/components/transaction/empty";
import AuthLayout from "@/layouts/AuthLayout";

export default function Home() {
  const noTransaction = false;

  return (
    <AuthLayout>
      <div className="bg-white pt-2 rounded-md mt-20 shadow-md">
        <TabMonths />

        {noTransaction ? <NoTransaction /> : <Summary />}
      </div>
    </AuthLayout>
  );
}
