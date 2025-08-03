import React from "react";
import { useMerchant } from "../../context/MerchantContext";
import "./OrderManager.css";

const ORDER_STATUSES = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "rejected"
];

const OrderManager = () => {
  const { orders, setOrders } = useMerchant();

  // Simulate some orders if empty (for demo)
  React.useEffect(() => {
    if (orders.length === 0) {
      setOrders([
        {
          id: "1",
          customer: "Ravi Kumar",
          items: ["Paneer Tikka", "Butter Naan"],
          total: 450,
          status: "pending"
        },
        {
          id: "2",
          customer: "Priya Singh",
          items: ["Veg Biryani"],
          total: 250,
          status: "pending"
        }
      ]);
    }
  }, [orders, setOrders]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="order-manager">
      <h2>Orders</h2>
      <div className="order-list">
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map(order => (
          <div className={`order-card status-${order.status}`} key={order.id}>
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className={`status-badge ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-details">
              <div><b>Customer:</b> {order.customer}</div>
              <div><b>Items:</b> {order.items.join(", ")}</div>
              <div><b>Total:</b> ₹{order.total}</div>
            </div>
            <div className="order-actions">
              {order.status === "pending" && (
                <>
                  <button onClick={() => updateOrderStatus(order.id, "accepted")}>Accept</button>
                  <button className="danger" onClick={() => updateOrderStatus(order.id, "rejected")}>Reject</button>
                </>
              )}
              {order.status === "accepted" && (
                <button onClick={() => updateOrderStatus(order.id, "preparing")}>Start Preparing</button>
              )}
              {order.status === "preparing" && (
                <button onClick={() => updateOrderStatus(order.id, "ready")}>Mark Ready</button>
              )}
              {order.status === "ready" && <span className="ready-msg">Ready for Pickup/Delivery</span>}
              {order.status === "rejected" && <span className="rejected-msg">Order Rejected</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManager;
