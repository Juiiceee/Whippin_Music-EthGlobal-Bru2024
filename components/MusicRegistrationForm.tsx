"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import { supabaseClient } from "@/utils/supabaseClient";
import { Song } from "@/types";
import { uploadFiles } from "@/utils/lighthouseClient";
import { useUser } from "@/hooks/useUser";

interface MusicRegistrationFormProps {}

interface FormValues {
  name: string;
  symbol: string;
  price: number;
  priceUnit: string;
  uri: string;
  song: FileList | undefined;
  image: FileList | undefined;
}

const MusicRegistrationForm: React.FC<MusicRegistrationFormProps> = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      symbol: "",
      price: 0,
      priceUnit: "wei",
      uri: "",
      song: undefined,
      image: undefined,
    },
  });

  const price = watch("price");

  const convertPrice = (price: number, unit: string) => {
    if (unit === "gwei") return price * 1e9;
    if (unit === "ether") return price * 1e18;
    return price;
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const convertedPrice = convertPrice(values.price, values.priceUnit);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile) {
        toast.error("Missing fields");
        return;
      }

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      await uploadFiles(songFile, imageFile, values.symbol, values.name, user.id);

      const { error } = await supabaseClient
        .from<Song>("songs")
        .insert([
          {
            id: crypto.randomUUID(),
            user_id: user.id,
            author: values.name,
            title: values.symbol,
            song_path: values.uri,
            image_path: "",
          },
        ]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Music registered successfully!");
        reset();
        router.push("app/(site)/page");
      }
    } catch (error: any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (value < 0) {
      event.target.value = "0";
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-neutral-900 rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-white">Music Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="name" className="text-white">Name:</label>
          <Input
            id="name"
            {...register("name", { required: true })}
            placeholder="Music Name"
          />
        </div>
        <div>
          <label htmlFor="symbol" className="text-white">Symbol:</label>
          <Input
            id="symbol"
            {...register("symbol", { required: true })}
            placeholder="Symbol"
          />
        </div>
        <div>
          <label htmlFor="price" className="text-white">Price:</label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: true, min: 0 })}
            placeholder="Price"
            onChange={handlePriceChange}
            onBlur={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="priceUnit" className="text-white">Unit:</label>
          <select
            id="priceUnit"
            {...register("priceUnit", { required: true })}
            className="form-select w-full mt-1 p-2 rounded-md bg-neutral-700 text-white"
          >
            <option value="wei">Wei</option>
            <option value="gwei">Gwei</option>
            <option value="ether">Ether</option>
          </select>
        </div>
        <div>
          <div className="pb-1 text-white">Select a song file</div>
          <Input
            placeholder="Select a song file"
            type="file"
            accept=".mp3"
            id="song"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 text-white">Select an image</div>
          <Input
            placeholder="Select an image"
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default MusicRegistrationForm;
