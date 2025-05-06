import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  CardHeader,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useExchangeRates } from "../hooks/useExchangeRates";
import { StoreContext } from "../context/StoreContext";

const ExchangeRatesList = () => {
  const { rates, baseCurrency, setBaseCurrency, loading, error } =
    useExchangeRates();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useContext(StoreContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter rates based on search term
  const filteredRates = Object.entries(rates || {}).filter(([currency]) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page data
  const currentPageRates = filteredRates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 2,
        color: "text.primary",
      }}
    >
      <h1
        className={`font-semibold text-3xl mb-[20px] ${theme === 'light' ? "text-black" : "text-white"}`}
      >
        Live Exchange Rates
      </h1>

      <Card
        sx={{
          mb: 4,
          bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
        }}
      >
        <CardHeader
          title={`Exchange Rates (Base: ${baseCurrency})`}
          sx={{
            "& .MuiCardHeader-title": {
              color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
            },
          }}
        />
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Base Currency"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
              sx={{
                mb: 2,
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
              placeholder="USD"
              fullWidth
            />

            <TextField
              label="Search Currency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search currency..."
              fullWidth
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
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
                color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
              }}
            >
              <CircularProgress
                color={theme === "dark" ? "inherit" : "primary"}
              />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                py: 2,
                bgcolor:
                  theme === "dark" ? "rgba(211, 47, 47, 0.1)" : undefined,
                color: theme === "dark" ? "#fff" : undefined,
                "& .MuiAlert-icon": {
                  color: theme === "dark" ? "#f44336" : undefined,
                },
              }}
            >
              {error}
            </Alert>
          ) : (
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
              }}
            >
              <TableContainer>
                <Table stickyHeader aria-label="exchange rates table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
                          color:
                            theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                          borderBottomColor:
                            theme === "dark"
                              ? "rgba(255, 255, 255, 0.12)"
                              : "rgba(224, 224, 224, 1)",
                        }}
                      >
                        Currency
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: theme === "dark" ? "#1e1e1e" : "#fff",
                          color:
                            theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                          borderBottomColor:
                            theme === "dark"
                              ? "rgba(255, 255, 255, 0.12)"
                              : "rgba(224, 224, 224, 1)",
                        }}
                      >
                        Rate
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentPageRates.map(([currency, rate]) => (
                      <TableRow
                        key={currency}
                        sx={{
                          "&:nth-of-type(odd)": {
                            bgcolor:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(0, 0, 0, 0.04)",
                          },
                          "&:hover": {
                            bgcolor:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.07)",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            color:
                              theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                            borderBottomColor:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.12)"
                                : "rgba(224, 224, 224, 1)",
                          }}
                        >
                          {currency}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                            borderBottomColor:
                              theme === "dark"
                                ? "rgba(255, 255, 255, 0.12)"
                                : "rgba(224, 224, 224, 1)",
                          }}
                        >
                          {rate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredRates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                  ".MuiTablePagination-selectIcon": {
                    color:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.54)",
                  },
                  ".MuiTablePagination-select": {
                    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
                  },
                  ".MuiTablePagination-actions": {
                    "& .MuiIconButton-root": {
                      color:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.54)",
                      "&.Mui-disabled": {
                        color:
                          theme === "dark"
                            ? "rgba(255, 255, 255, 0.3)"
                            : "rgba(0, 0, 0, 0.26)",
                      },
                    },
                  },
                }}
              />
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExchangeRatesList;
