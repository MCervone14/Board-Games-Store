import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HomePageLoading = () => {
  return (
    <div className="container">
      <div className="flex h-full space-y-8 p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between space-y-2">
          <div className="w-full flex justify-between flex-col items-center">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
              <Button className="bg-blue-600">Add Product</Button>
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Id</TableHead>
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

export default HomePageLoading;
