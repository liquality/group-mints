import ApiService from "@/services/ApiService";
import ContractService from "@/services/ContractService";
import { Group } from "@/types/general-types";
import { useEffect, useState } from "react";
import useGetMyGroups from "./Groups/useGetMyGroups";

const useSyncRewardsData = () => {
  const {myGroups: groups, loading: loadingGroups } = useGetMyGroups()
  const [rewardsData, setRewardsData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: 
    //1: fetch data from contracts

    //2: send data to backend
    const fetchData = async () => {
      try {
        if (!groups) {
          setLoading(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching Rewards Summary");
      }
    };

    fetchData();
  }, [groups]);

  return { loadingGroups, loadingRewardsData: loading, rewardsData };
};
export default useSyncRewardsData;
