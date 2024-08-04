import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

const BasketLoadingPage = () => {
  return (
    <Table className="container h-screen my-10">
      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow key={index} className="flex flex-col sm:flex-row relative">
            <TableCell className="m-auto">
              <Skeleton className="min-w-[84px] min-h-[84px] max-w-[84px] max-h-[84px] bg-gray-100" />
            </TableCell>
            <TableCell className="font-medium m-auto text-center flex-1">
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="m-auto">
              <Skeleton className="h-5 w-[100px]" />
            </TableCell>
            <TableCell className="text-center m-auto min-w-[200px] flex items-center justify-center">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BasketLoadingPage;
