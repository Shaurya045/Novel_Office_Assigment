import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { StoreContext } from "../context/StoreContext";

const EMITable = ({ data, currency }) => {
  const { convertCurrency } = useCurrencyConverter();
  const [convertedData, setConvertedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(StoreContext);

  useEffect(() => {
    const convertData = async () => {
      if (data.length === 0) return;

      setIsLoading(true);

      try {
        const converted = await Promise.all(
          data.map(async (row) => {
            if (currency === "USD") {
              return { ...row };
            }
            const convertedPrincipal = await convertCurrency(
              row.principal,
              "USD",
              currency
            );
            const convertedInterest = await convertCurrency(
              row.interest,
              "USD",
              currency
            );
            const convertedRemainingBalance = await convertCurrency(
              row.remainingBalance,
              "USD",
              currency
            );

            return {
              ...row,
              principal: convertedPrincipal,
              interest: convertedInterest,
              remainingBalance: convertedRemainingBalance,
            };
          })
        );

        setConvertedData(converted);
      } catch (error) {
        console.error("Error converting data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    convertData();
  }, [data, currency, convertCurrency]);

  const tableContainerStyle = {
    width: "100%",
    border: theme === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
  };

  const tableHeaderStyle = {
    backgroundColor: theme === "dark" ? "#121212" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    padding: "16px",
    margin: 0,
    fontSize: "18px",
    fontWeight: "normal",
    borderBottom: theme === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
  };

  const headerStyle = {
    padding: "16px",
    fontWeight: "normal",
    color: theme === "dark" ? "#fff" : "#000",
    backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
    borderBottom: theme === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
    textAlign: "left",
  };

  const cellStyle = {
    padding: "16px",
    borderBottom: theme === "dark" ? "1px solid #333" : "1px solid #e0e0e0",
    color: theme === "dark" ? "#fff" : "#000",
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={tableContainerStyle}>
          <h2 style={tableHeaderStyle}>Amortization Schedule ({currency})</h2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            Loading...
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={tableContainerStyle}>
        <h2 style={tableHeaderStyle}>Amortization Schedule ({currency})</h2>

        <Box
          sx={{
            maxHeight: "440px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme === "dark" ? "#1e1e1e" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme === "dark" ? "#555" : "#ccc",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: theme === "dark" ? "#777" : "#aaa",
            },
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={{ ...headerStyle, width: "25%" }}>Month</th>
                <th
                  style={{ ...headerStyle, width: "25%", textAlign: "right" }}
                >
                  Principal
                </th>
                <th
                  style={{ ...headerStyle, width: "25%", textAlign: "right" }}
                >
                  Interest
                </th>
                <th
                  style={{ ...headerStyle, width: "25%", textAlign: "right" }}
                >
                  Remaining Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {convertedData.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? index % 2 === 0
                          ? "#1e1e1e"
                          : "#262626"
                        : index % 2 === 0
                        ? "#fff"
                        : "#f9f9f9",
                  }}
                >
                  <td style={{ ...cellStyle, textAlign: "left" }}>
                    {index + 1}
                  </td>
                  <td style={{ ...cellStyle, textAlign: "right" }}>
                    {row.principal.toFixed(2)} {currency}
                  </td>
                  <td style={{ ...cellStyle, textAlign: "right" }}>
                    {row.interest.toFixed(2)} {currency}
                  </td>
                  <td style={{ ...cellStyle, textAlign: "right" }}>
                    {row.remainingBalance.toFixed(2)} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default EMITable;
