import { token } from "@mfa/dds";

const useLogout = () => {
  const handleClickLogout = () => {
    token.clearToken();
    window.location.href = "https://dodam.b1nd.com/sign";
  };

  return {
    handleClickLogout,
  };
};

export default useLogout;
