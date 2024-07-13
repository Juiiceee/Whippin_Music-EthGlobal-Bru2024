"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "./Input";
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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      licenseCount: 1,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      purchaseModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<any> = async (values) => {
    try {
      // Simulate license purchase process integrate HERE
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess(); // Call the onSuccess callback after successful submission integrate HERE

      purchaseModal.onClose();
      toast.success("License purchased successfully!");
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <Modal
      title="Purchase License"
      description="Please enter the number of licenses you want to purchase."
      isOpen={purchaseModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="licenseCount"
          type="number"
          {...register("licenseCount", { required: true, min: 1 })}
          placeholder="Number of licenses"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default PurchaseModal;
