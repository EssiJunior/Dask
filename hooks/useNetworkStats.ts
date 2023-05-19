import { useActions } from '@dilane3/gx';
import * as Network from 'expo-network';
import { useEffect } from 'react';

export default function useNetworkStats() {
  // Global state
  const { changeNetworkStats } = useActions("network")

  useEffect(() => {
    const timer = setInterval(() => {
      getNetworkStats();
    }, 10000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  /**
   * Get network stats
   */
  const getNetworkStats = async () => {
    const networkStats = await Network.getNetworkStateAsync();
    changeNetworkStats({ ...networkStats, ready: true });
  }
}