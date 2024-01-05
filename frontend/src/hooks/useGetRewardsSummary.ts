import ApiService from "@/services/ApiService";
import ContractService from "@/services/ContractService";
import { useEffect, useState } from "react";

const useGetRewardsSummary = () => {
  const [summary, setSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    ContractService.createCollective
    const fetchData = async () => {
      try {
        if (!summary) {
          setLoading(true);
          const result = await ApiService.getRewardsSummary();
          setSummary(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching Rewards Summary");
      }
    };

    fetchData();
  }, [summary]);

  return { summary, loading };
};
export default useGetRewardsSummary;
