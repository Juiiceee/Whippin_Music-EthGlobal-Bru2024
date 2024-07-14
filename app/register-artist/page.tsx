import ArtistRegistrationForm from "@/components/ArtistRegistrationForm";

const RegisterArtistPage = () => {
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <div className="flex-1 bg-neutral-900 p-4 overflow-y-auto">
        <ArtistRegistrationForm />
      </div>
    </div>
  );
};

export default RegisterArtistPage;