"use client";
import { useLogin } from "@/hooks/login/index/useLogin";
import { useLoginStore } from "@/stores/login/login-stores";
import {
  Button,
  FormLabel,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";

export default function LoginIndexPage() {
  const { username, password, setUsername, setPassword } = useLoginStore();
  const { handleOnClickLogin, isPending: isPendingLogin } = useLogin();

  const handleOnChange = ({
    e,
    type,
  }: {
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    type: string;
  }) => {
    const value = e.target.value;
    if (type === "username") return setUsername(value);
    setPassword(value);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side (form) */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo-jm-transparent.png"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => handleOnChange({ e, type: "username" })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => handleOnChange({ e, type: "password" })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              disabled={isPendingLogin}
              onClick={() => handleOnClickLogin({ username, password })}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              startIcon={
                isPendingLogin ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }>
              {isPendingLogin ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center p-12">
        <Image
          src="/logo-jm-transparent.png"
          alt="Big Logo"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
