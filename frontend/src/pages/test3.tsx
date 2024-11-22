import Table from "@/components/ui/table";
import React from "react";


const ProductTable = () => {
  const headers = ["Product name", "Color", "Category", "Price", "Action"];
  const data = [
    {
      "product name": "Apple MacBook Pro 17\"",
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      "product name": "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      "product name": "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      "product name": "Google Pixel Phone",
      color: "Gray",
      category: "Phone",
      price: "$799",
    },
    {
      "product name": "Apple Watch 5",
      color: "Red",
      category: "Wearables",
      price: "$999",
    },
  ];

  return <Table headers={headers} data={data} />;
};

export default ProductTable;
