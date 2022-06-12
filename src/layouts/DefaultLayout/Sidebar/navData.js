import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faTable,
  faTag,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

export const navData = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <FontAwesomeIcon icon={faTable} />,
    active: true,
  },
  {
    title: "Model",
    to: "/model",
    icon: <FontAwesomeIcon icon={faCube} />,
    active: false,
  },
  {
    title: "Resources",
    to: "/resources",
    icon: <FontAwesomeIcon icon={faTag} />,
    active: false,
  },
  {
    title: "Tags",
    to: "/tags",
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    active: false,
  },
];
