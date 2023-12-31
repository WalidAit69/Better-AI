"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPremium: boolean;
}
function SubscriptionButton({ isPremium }: SubscriptionButtonProps) {
  const [loading, setloading] = useState(false);

  const onClick = async () => {
    try {
      setloading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setloading(false);
    }
  };

  return (
    <Button
      className="w-fit"
      onClick={onClick}
      disabled={loading}
      variant={isPremium ? "default" : "premuim"}
    >
      {isPremium ? "Manage Subscription" : "Upgrade"}
      {!isPremium && <Zap className="w-4 h-4 ml-2" />}
    </Button>
  );
}

export default SubscriptionButton;
