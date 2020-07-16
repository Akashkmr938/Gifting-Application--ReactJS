import React, { useCallback, useState, useEffect } from 'react';
import { httpGet } from '../../shared/utils/http/http';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

export default function SimpleTable() {
  const [giftCards, setGiftCards] = useState([]);

  const fetchAllGiftCards = useCallback(async () => {
    const response = await httpGet('/giftCards');
    setGiftCards(response.data);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllGiftCards();
  }, [fetchAllGiftCards]);

  return (
    <Table
      width={1700}
      height={620}
      headerHeight={20}
      rowHeight={60}
      overscanRowCount={5}
      rowCount={giftCards.length}
      rowGetter={({ index }) => giftCards[index]}>
      <Column label="Card ID" dataKey="id" width={200} />
      <Column label="Card Name" dataKey="name" width={800} />
      <Column label="Card Brand" dataKey="brand" width={200} />
      <Column width={200} label="Price Points" dataKey="buyoutPoints" />
      <Column width={200} label="Discount" dataKey="discount" />
      <Column width={1000} label="Description" dataKey="desc" />
    </Table>
  );
}
