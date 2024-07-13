"use client";

import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import usePurchaseModal from "@/hooks/usePurchaseModal";
import PurchaseModal from "./PurchaseModal"; 

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const purchaseModal = usePurchaseModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = FaEthereum;

  const handlePurchaseSuccess = async () => {
    const { error } = await supabaseClient.from("liked_songs").insert({
      song_id: songId,
      user_id: user.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsLiked(true);
      toast.success("Song license obtained!");
    }

    router.refresh();
  };

  const handleLike = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .then(({ error }) => {
          if (error) {
            toast.error(error.message);
          } else {
            setIsLiked(false);
          }
        });
    } else {
      purchaseModal.onOpen();
    }
  };

  return (
    <>
      <button
        className="cursor-pointer hover:opacity-75 transition"
        onClick={handleLike}
      >
        <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
      </button>
      {purchaseModal.isOpen && (
        <PurchaseModal songId={songId} onSuccess={handlePurchaseSuccess} />
      )}
    </>
  );
};

export default LikeButton;
