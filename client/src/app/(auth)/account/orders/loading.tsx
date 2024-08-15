import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersLoadingPage = () => {
  return (
    <div className="container">
      <div className="flex h-full justify-center space-y-8 p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between space-y-2">
          <div className="w-full flex justify-between flex-col items-center">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold tracking-tight">
                <Skeleton className="w-48 h-4" />
              </h2>
              <div />
            </div>
            <div className="flex justify-center items-center w-full h-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersLoadingPage;
