import React, { useState, Fragment, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
// My imports.
import PastOrderList from './PastOrderList';
import Modal from '../UI/Modal';
import Receipt from '../Receipt/Receipt';
// CSS import.
import styles from './DisplayPastOrders.module.css';

export default function DisplayPastOrders({ orders }) {
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  const showDetailedReceipt = (order) => {
    // Shows a full detailed receipt on the modal component.
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
      {ReactDOM.createPortal(
        <AnimatePresence>
          {showReceipt && (
            <Modal onClose={closeDetailedReceipt}>
              <Receipt
                items={orderReceipt.items}
                totalItems={orderReceipt.totalItems}
                totalPrice={orderReceipt.totalPrice}
                orderDate={orderReceipt.orderDate}
                showReceiptItems={true}
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
