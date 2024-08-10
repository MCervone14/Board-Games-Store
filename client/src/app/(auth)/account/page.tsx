import { orderColumns } from "@/features/table/data/orders-data/order-columns";
import { DataTable } from "@/features/table/table";
import { getCurrentUser, getOrders } from "@/actions/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ProfileSettingsForm from "@/features/form/profile-settings-form";

const AccountPage = async () => {
  const orders = await getOrders();
  const user = await getCurrentUser();

  return (
    <div className="container min-h-screen mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Account</h1>
        <div className="flex space-x-4"></div>
      </div>
      <Tabs
        defaultValue="Orders"
        className="w-full mx-auto flex flex-col justify-center"
      >
        <TabsList className="grid w-full mx-auto grid-cols-2">
          <TabsTrigger value="Orders" className="">
            Orders
          </TabsTrigger>
          <TabsTrigger value="Settings" className="">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Orders">
          <Card className="text-primary/90 w-full mx-auto">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription className="text-primary/90">
                List of recent order transactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              {<DataTable data={orders} columns={orderColumns} />}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Settings">
          <Card className="text-primary/90 w-full mx-auto h-fit">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription className="text-primary/90">
                Change your profile settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <ProfileSettingsForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountPage;
