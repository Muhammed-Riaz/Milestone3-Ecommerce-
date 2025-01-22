"use client";

import { useState } from "react";

const ShipmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/shipengine/get-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipToAddress: {
            name: "Michael Smith",
            phone: "+1 555 987 6543",
            addressLine1: "456 Oak Avenue",
            addressLine2: "Suite 200",
            cityLocality: "Los Angeles",
            stateProvince: "CA",
            postalCode: "90001",
            countryCode: "US",
            addressResidentialIndicator: "no",
          },
          packages: [
            {
              weight: { value: 5, unit: "ounce" },
              dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch rates");
      }

      const data = await response.json();
      setRates(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Get Shipping Rates</h1>
      <button onClick={fetchRates} disabled={loading}>
        {loading ? "Loading..." : "Get Rates"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {rates && (
        <div>
          <h2>Shipping Rates</h2>
          <pre>{JSON.stringify(rates, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShipmentPage;
