import { useRefMounted } from '@/hooks/useRefMounted';
import { cryptoOrdersApi } from '@/mocks/crypto_orders';
import { CryptoOrder } from '@/models/crypto_order';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const isMountedRef = useRefMounted();
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrder[]>([]);

  const getCryptoOrders = useCallback(async () => {
    try {
      const response = await cryptoOrdersApi.getCryptoOrders();

      if (isMountedRef()) {
        setCryptoOrders(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCryptoOrders();
  }, [getCryptoOrders]);

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
