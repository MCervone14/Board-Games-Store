import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductLoadingPage = () => {
  return (
    <div className="container py-10 bg-white">
      <div className="flex mx-auto gap-5 justify-center items-center">
        <div className="max-w-7xl relative w-[500px] h-[500px]">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton className="h-5 mt-2 w-full" key={index} />
          ))}

          <Skeleton className="h-10 w-40 mt-10 mx-auto" />
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Details</TableHead>
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
  );
};

export default ProductLoadingPage;
