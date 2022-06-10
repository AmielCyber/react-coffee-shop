import React, { useState, useEffect, Fragment, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
// My imports.
import PastOrderList from './PastOrderList';
import Modal from '../UI/Modal';
import Receipt from '../Receipt/Receipt';
// CSS import.
import styles from './DisplayPastOrders.module.css';

export default function DisplayPastOrders({ orders }) {
  const [mounted, setMounted] = useState(false); // To use create portal in the client.
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  useEffect(() => {
    // The document is mounted on the client's side.
    setMounted(true);
  }, []);

  const showDetailedReceipt = (order) => {
    setShowReceipt(true);
    setOrderReceipt(order);
  };

  const closeDetailedReceipt = useCallback(() => {
    setOrderReceipt(null);
    setShowReceipt(false);
  }, []);

  return (
    <Fragment>
      <PastOrderList orders={orders} onShowReceipt={showDetailedReceipt} />
      {mounted &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {showReceipt && (
              <Modal onClose={closeDetailedReceipt}>
                <Receipt
                  items={orderReceipt.items}
                  totalItems={orderReceipt.totalItems}
                  totalPrice={orderReceipt.totalPrice}
                  orderDate={new Date(orderReceipt.orderDate)}
                  showRecieptItems={true}
                />
                <div className={styles.actions}>
                  <button onClick={closeDetailedReceipt}>Close</button>
                </div>
              </Modal>
            )}
          </AnimatePresence>,
          document.querySelector('#overlays')
        )}
    </Fragment>
  );
}
