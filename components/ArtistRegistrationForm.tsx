"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { supabaseClient  } from "@/utils/supabaseClient";

interface ArtistRegistrationFormProps {}

interface FormValues {
  isArtist: boolean;
  mainName: string;
  mainType: string;
}

const ArtistRegistrationForm: React.FC<ArtistRegistrationFormProps> = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      isArtist: false,
      mainName: "",
      mainType: "0",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      // Simulate form submission process integrate HERE
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would make your API request to register the artist integrate HERE
      const { error } = await supabaseClient.from("artists").insert({
        is_artist: values.isArtist,
        main_name: values.mainName,
        main_type: values.mainType,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Artist registered successfully!");
        reset();
        router.push("app/(site)/page");
      }
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">Artist Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="mainName" className="text-white">Main name:</label>
          <Input
            id="mainName"
            {...register("mainName", { required: true })}
            placeholder="Michael Jackson"
          />
        </div>
        <div>
          <label htmlFor="mainType" className="text-white">Main type:</label>
          <select
            id="mainType"
            {...register("mainType", { required: true })}
            className="form-select w-full mt-1 p-2 rounded-md bg-neutral-700 text-white"
          >
            <option value="0">Singer</option>
            <option value="1">Instrumentalist</option>
            <option value="2">Composer</option>
            <option value="3">Lyricist</option>
            <option value="4">Producer</option>
            <option value="5">DiscJokey</option>
            <option value="6">Conductor</option>
            <option value="7">Arranger</option>
            <option value="8">Engineer</option>
            <option value="9">Director</option>
          </select>
        </div>
        <Button type="submit">Enregistrer</Button>
      </form>
    </div>
  );
};

export default ArtistRegistrationForm;