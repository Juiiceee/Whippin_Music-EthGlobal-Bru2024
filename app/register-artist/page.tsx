import ArtistRegistrationForm from "@/components/ArtistRegistrationForm";
import Sidebar from "@/components/Sidebar";

const RegisterArtistPage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-neutral-800">
        <ArtistRegistrationForm />
      </div>
    </div>
  );
};

export default RegisterArtistPage;
