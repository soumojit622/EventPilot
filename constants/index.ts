import { Home, PlusCircle, User } from "lucide-react";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
    icon: Home, // Home icon
  },
  {
    label: "Create Event",
    route: "/events/create",
    icon: PlusCircle, // Plus/Add icon
  },
  {
    label: "My Profile",
    route: "/profile",
    icon: User, // User/Profile icon
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
  // Optional: You could add an icon per category if needed, e.g.,
  // icon: SomeIcon
};
