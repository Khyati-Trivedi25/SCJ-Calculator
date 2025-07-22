import React, { useState } from "react";
import CurrencySymbol from "./CurrencySymbol";

const TVODCalculator = ({ currency }) => {
  const [transactions, setTransactions] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  const totalTransactions = parseFloat(transactions) || 0;
  const pricePerTicket = parseFloat(ticketPrice) || 0;

  // Deductions
  const gstAmount = pricePerTicket * 0.18;
  const transactionFee = currency === "INR" ? 3 : 0.1;
  const inAppFee = pricePerTicket * 0.3;

  const netPerTicket = pricePerTicket - gstAmount - transactionFee - inAppFee;

  const grossRevenue = totalTransactions * netPerTicket;

  const platformShare = grossRevenue * 0.5;
  const contentCreatorShare = grossRevenue * 0.4 * 0.95; // After 5% TDS
  const scjShare = grossRevenue * 0.1;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">TVOD Revenue Calculator</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Total Transactions</label>
          <input
            type="number"
            className="input"
            value={transactions}
            onChange={(e) => setTransactions(e.target.value)}
            placeholder="e.g. 1500"
          />
        </div>
        <div>
          <label className="font-medium">Ticket Price ({currency})</label>
          <input
            type="number"
            className="input"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            placeholder="e.g. 120 or 1.99"
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Gross Revenue:</strong> <CurrencySymbol currency={currency} />
          {grossRevenue.toFixed(2)}
        </p>
        <p>
          <strong>
            Net Per Ticket (after GST, platform & transaction fee):
          </strong>{" "}
          <CurrencySymbol currency={currency} />
          {netPerTicket.toFixed(2)}
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
          {contentCreatorShare.toFixed(2)}
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

export default TVODCalculator;
