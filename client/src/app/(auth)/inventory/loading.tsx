import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InventoryLoadingPage = () => {
  return (
    <Table className="flex flex-col items-center h-screen py-10">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-48 h-4" />
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
  );
};

export default InventoryLoadingPage;
