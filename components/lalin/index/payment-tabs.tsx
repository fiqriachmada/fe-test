import React from "react";
import {
  Tabs,
  Tab,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useLalinStore } from "@/stores/lalin/lalin-store";

export const PaymentTabs: React.FC = () => {
  const {
    activeTab,
    paymentMethods,
    setActiveTab,
    togglePaymentMethodVisibility,
  } = useLalinStore();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const visibleMethods = paymentMethods.filter((method) => method.visible);
  const activeMethod = paymentMethods.find((method) => method.id === activeTab);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "bold",
              minHeight: 48,
            },
          }}>
          {visibleMethods.map((method) => (
            <Tab
              key={method.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: method.color,
                    }}
                  />
                  {method.name}
                </Box>
              }
              value={method.id}
              sx={{
                "&.Mui-selected": {
                  color: method.color,
                },
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {activeMethod && (
            <Chip
              label={`Active: ${activeMethod.name}`}
              size="small"
              sx={{
                backgroundColor: activeMethod.color,
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}

          <IconButton
            onClick={handleSettingsClick}
            size="small"
            sx={{
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 280,
            maxHeight: 400,
          },
        }}>
        <MenuItem disabled>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Pengaturan Tab Payment
          </Typography>
        </MenuItem>
        <Divider />

        {paymentMethods.map((method) => (
          <MenuItem key={method.id} sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: method.color,
                  mr: 2,
                }}
              />
              <Typography sx={{ flexGrow: 1, fontSize: "0.875rem" }}>
                {method.name}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={method.visible}
                    onChange={() => togglePaymentMethodVisibility(method.id)}
                    size="small"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: method.color,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: method.color,
                        },
                    }}
                  />
                }
                label=""
                sx={{ m: 0 }}
              />
              {method.visible ? (
                <VisibilityIcon
                  sx={{ fontSize: 16, color: "success.main", ml: 1 }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{ fontSize: 16, color: "text.disabled", ml: 1 }}
                />
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
