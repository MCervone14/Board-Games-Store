import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
const AccountLoadingPage = async () => {
  return (
    <div className="container min-h-screen mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          <Skeleton className="w-48 h-4" />
        </h1>
        <div className="flex space-x-4"></div>
      </div>
      <Tabs
        defaultValue="Orders"
        className="w-full mx-auto flex flex-col justify-center"
      >
        <TabsList className="grid w-full mx-auto grid-cols-2">
          <TabsTrigger value="Orders" className="">
            <Skeleton className="w-48 h-4" />
          </TabsTrigger>
          <TabsTrigger value="Settings" className="">
            <Skeleton className="w-48 h-4" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Orders">
          <Card className="text-primary/90 w-full mx-auto">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-48 h-4" />
              </CardTitle>
              <CardDescription className="text-primary/90">
                <Skeleton className="w-48 h-4" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Skeleton className="w-24 h-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="w-48 h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-[700px] h-4" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Settings">
          <Card className="text-primary/90 w-full mx-auto h-fit">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-48 h-4" />
              </CardTitle>
              <CardDescription className="text-primary/90">
                <Skeleton className="w-48 h-4" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Skeleton className="w-24 h-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="w-48 h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-[700px] h-4" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountLoadingPage;
