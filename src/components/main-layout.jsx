import { ConfigProvider } from "antd";
import vn from "antd/es/locale-provider/vi_VN";

export const MainLayout = ({ children }) => {
  return <ConfigProvider locale={vn}>{children}</ConfigProvider>;
};
