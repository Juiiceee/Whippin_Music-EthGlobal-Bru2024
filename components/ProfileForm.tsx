"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { supabaseClient } from "@/utils/supabaseClient";
import { useUser } from "@/hooks/useUser";

interface FormValues {
  firstName: string;
  lastName: string;
}

const ProfileForm: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { error } = await supabaseClient
        .from("user_profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
        })
        .eq("id", user?.id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Profile updated successfully!");
        reset();
        router.push("/");
      }
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-white">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="firstName" className="text-white">First Name:</label>
          <Input
            id="firstName"
            {...register("firstName", { required: true })}
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-white">Last Name:</label>
          <Input
            id="lastName"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default ProfileForm;
