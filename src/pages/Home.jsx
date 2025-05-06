import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { StoreContext } from "../context/StoreContext";
import { useEMICalculator } from "../hooks/useEMICalculator";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import EMITable from "../components/EMITable";

function Home() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const { theme } = useContext(StoreContext);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showAmortization, setShowAmortization] = useState(false);

  const { calculateEmi, calculateAmortizationSchedule } = useEMICalculator();
  const { convertCurrency, currencies } = useCurrencyConverter();

  const [emi, setEmi] = useState(null);
  const [convertedEmi, setConvertedEmi] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const handleCalculate = () => {
    if (loanAmount && interestRate && loanTerm) {
      const calculatedEmi = calculateEmi(
        loanAmount,
        interestRate,
        loanTerm * 12
      );
      setEmi(calculatedEmi);

      const schedule = calculateAmortizationSchedule(
        loanAmount,
        interestRate,
        loanTerm * 12
      );
      setAmortizationSchedule(schedule);
      setShowAmortization(true);
    }
  };

  useEffect(() => {
    if (emi && selectedCurrency !== "USD") {
      convertCurrency(emi, "USD", selectedCurrency).then((converted) => {
        setConvertedEmi(converted);
      });
    } else {
      setConvertedEmi(emi);
    }
  }, [emi, selectedCurrency, convertCurrency]);

  const resetTable = () => {
    setShowAmortization(false);
    setEmi(null);
  };

  return (
    <div className=" mr-auto">
      <h1 className="text-3xl font-medium mb-6">Loan Calculator Dashboard</h1>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <TextField
            id="loanAmount"
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiInputBase-input": {
                color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
        </div>
        <div>
          <TextField
            id="interestRate"
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiInputBase-input": {
                color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
        </div>
        <div>
          <TextField
            id="loanTerm"
            label="Term (Years)"
            type="number"
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            variant="outlined"
            color="primary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.23)"
                      : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                },
              },
              "& .MuiInputLabel-root": {
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiInputBase-input": {
                color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
        </div>
      </div>
      <Button
        onClick={handleCalculate}
        variant="contained"
        className={`mb-6 ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        CALCULATE
      </Button>

      {emi && (
        <div className="mb-6 mt-6">
          <h2 className="text-xl font-base mb-4">
            Monthly EMI: ${emi.toFixed(2)}
          </h2>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">
            <div>
              <InputLabel
                id="currency-label"
                sx={{
                  color:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(0, 0, 0, 0.6)",
                }}
              >
                Currency
              </InputLabel>
              <Select
                labelId="currency-label"
                id="currency-select"
                value={selectedCurrency}
                label="Currency"
                onChange={(e) => setSelectedCurrency(e.target.value)}
                sx={{
                  color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.23)"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.5)",
                  },
                  ".MuiSvgIcon-root": {
                    color:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.54)",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
                      color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                    },
                  },
                }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button
              variant="outlined"
              onClick={resetTable}
              color="error"
              size="large"
            >
              RESET TABLE
            </Button>
          </div>
        </div>
      )}

      {showAmortization && (
        <div>
          <EMITable data={amortizationSchedule} currency={selectedCurrency} />
        </div>
      )}
    </div>
  );
}

export default Home;
