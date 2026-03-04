import { useQueryClient } from "@tanstack/react-query";

export const useQueryInvalidates = () => {
  const queryClient = useQueryClient();

  const queryInvalidates = (queryKeys: (string | (string | number)[])[]) => {
    return queryKeys.map((item) =>
      queryClient.invalidateQueries({ queryKey: Array.isArray(item) ? item : [item] })
    );
  };

  return { queryInvalidates };
};
