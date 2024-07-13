"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Button from "./Button";
import usePurchaseModal from "@/hooks/usePurchaseModal";
import { useUser } from "@/hooks/useUser";

interface PurchaseModalProps {
  songId: string;
  onSuccess: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ songId, onSuccess }) => {
  const purchaseModal = usePurchaseModal();
  const { user } = useUser();

  const { handleSubmit, reset } = useForm();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      purchaseModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<any> = async () => {
    try {
      // Fixed license count to 1
      const licenseCount = 1;

      // Simulate license purchase process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess(); // Call the onSuccess callback after successful submission

      purchaseModal.onClose();
      toast.success("License purchased successfully!");
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <Modal
      title="Purchase License"
      description="You are about to purchase a license for this song."
      isOpen={purchaseModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Button type="submit">Purchase License for 0.01 ETH</Button>
      </form>
    </Modal>
  );
};

export default PurchaseModal;
