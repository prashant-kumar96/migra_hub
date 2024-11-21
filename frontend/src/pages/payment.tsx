import CheckoutForm from "@/components/CheckoutFormComponent";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";

const Home = () => {
  const items = [
    { name: "Product 1", price: 2000, quantity: 1 },
    { name: "Product 2", price: 1500, quantity: 2 },
  ];

  return (
    <div>
      <h1>Visa Payment</h1>
      <CheckoutForm items={items} />
    </div>
  );
};

export default AfterLoginLayout(Home);
