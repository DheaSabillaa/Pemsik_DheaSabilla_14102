import { useState } from "react";
import { confirmLogout } from "../../Utils/Helpers/SwalHelpers";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    confirmLogout(() => {
      // Arahkan user ke route logout setelah konfirmasi
      window.location.href = "/login  ";
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-full bg-gray-300"
      ></button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
