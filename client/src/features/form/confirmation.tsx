"use client";

interface ConfirmationProps {
  orderNumber: string;
}

const Confirmation = ({ orderNumber }: ConfirmationProps) => {
  console.log(orderNumber);

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Confirmation of your order.</h2>
          <p className="text-gray-500 dark:text-gray-400">
            You have successfully placed your order. Your order number is{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
