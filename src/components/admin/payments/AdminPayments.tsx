import PaymentsTabs from "./PaymentsTabs";
import PaymentsSummaryCards from "./PaymentsSummaryCards";

const AdminPayments = () => {
  return (
    <section className="space-y-6">
      <PaymentsSummaryCards />
      <PaymentsTabs />
    </section>
  );
};

export default AdminPayments;
