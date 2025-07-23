import React, { useState } from "react";
import CurrencySymbol from "./CurrencySymbol";

const CARCalculator = ({ currency }) => {
  const [adRequests, setAdRequests] = useState("");
  const [car, setCar] = useState("");
  const [ssaiCost, setSsaiCost] = useState("");

  const totalAdRequests = parseFloat(adRequests) || 0;
  const costPerAdRequest = parseFloat(car) || 0;
  const ssai = (parseFloat(ssaiCost) || 0) * (totalAdRequests / 1000);

  const grossRevenue = totalAdRequests * costPerAdRequest;
  const dashboardUpkeep = grossRevenue * 0.05;
  const deductions = ssai + dashboardUpkeep;
  const netRevenue = grossRevenue - deductions;

  const platformShare = netRevenue * 0.5;
  const contentShareAfterTDS = netRevenue * 0.4 * 0.95;
  const scjShare = netRevenue * 0.1;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        CAR (Cost per Ad Request) Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Total Ad Requests</label>
          <input
            type="number"
            className="input"
            value={adRequests}
            onChange={(e) => setAdRequests(e.target.value)}
            placeholder="e.g. 200000"
          />
        </div>
        <div>
          <label className="font-medium">CAR ({currency})</label>
          <input
            type="number"
            className="input"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            placeholder="e.g. 0.05"
          />
        </div>
        <div>
          <label className="font-medium">SSAI Cost per 1000 Requests</label>
          <input
            type="number"
            className="input"
            value={ssaiCost}
            onChange={(e) => setSsaiCost(e.target.value)}
            placeholder="e.g. 2"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Gross Revenue:</strong> <CurrencySymbol currency={currency} />
          {grossRevenue.toFixed(2)}
        </p>
        <p>
          <strong>Deductions:</strong> <CurrencySymbol currency={currency} />
          {deductions.toFixed(2)}
        </p>
        <p>
          <strong>Net Revenue:</strong> <CurrencySymbol currency={currency} />
          {netRevenue.toFixed(2)}
        </p>
        <hr />
        <p>
          <strong>Platform Share (50%):</strong>{" "}
          <CurrencySymbol currency={currency} />
          {platformShare.toFixed(2)}
        </p>
        <p>
          <strong>Content Creator (40% - 5% TDS):</strong>{" "}
          <CurrencySymbol currency={currency} />
          {contentShareAfterTDS.toFixed(2)}
        </p>
        <p>
          <strong>SCJ Share (10% incl. GST):</strong>{" "}
          <CurrencySymbol currency={currency} />
          {scjShare.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CARCalculator;
