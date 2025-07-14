import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import FenceIcon from "@mui/icons-material/Fence";
export const useRoutes = () => {
  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Laporan Lalin Harian",
      href: "/lalins",
      icon: <InventoryIcon />,
      children: [
        {
          title: "Lalin",
          href: "/lalins",
          icon: <InventoryIcon />,
        },
        // {
        //   title: t?.adminShared?.sidebar?.menu?.freshFactoryProduct,
        //   href: "/admin/main-product/fresh-factory-product",
        //   icon: Snowflake,
        // },
        // {
        //   title: t?.adminShared?.sidebar?.menu?.grabmartProduct,
        //   href: "/admin/main-product/grabmart-product",
        //   icon: Store,
        // },
      ],
    },
    {
      title: "Master Data Gerbang",
      href: "/gates",
      icon: <FenceIcon />,
    },
  ];
  return { routes };
};
