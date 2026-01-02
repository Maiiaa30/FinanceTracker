import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PasswordInput = forwardRef(({ placeholder, ...props }, ref) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? "text" : "password"}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <Button
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
        variant="ghost"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
        type="button"
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
});

export default PasswordInput;
