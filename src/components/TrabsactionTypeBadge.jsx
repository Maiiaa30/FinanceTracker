import { cva } from "class-variance-authority";
import { CircleIcon } from "lucide-react";

const variants = cva(
  "bg-muted text-s flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 font-bold",
  {
    variants: {
      variant: {
        earning: "text-green-500 fill-green-500",
        expense: "text-red-500 fill-red-500",
        investment: "text-blue-500 fill-blue-500",
      },
    },
  }
);

const getText = (variant) => {
  switch (variant) {
    case "earning":
      return "Ganho";
    case "expense":
      return "Gasto";
    case "investment":
      return "Investimento";
    default:
      return "";
  }
};

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getText(variant)}
    </div>
  );
};

export default TransactionTypeBadge;
