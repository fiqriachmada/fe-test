"use client";

import { useLogin } from "@/hooks/login/index/useLogin";
import { useLoginStore } from "@/stores/login/login-stores";
import { Button, FormLabel, TextField } from "@mui/material";
import Image from "next/image";
import { ChangeEvent } from "react";

export default function LoginIndexPage() {
  const { username, password, timestamp, setUsername, setPassword, reset } =
    useLoginStore();

  const { handleOnClickLogin, isPending: isPendingLogin } = useLogin();

  const handleOnChange = ({
    e,
    type,
  }: {
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    type: string;
  }) => {
    const value = e.target.value;
    if (type === "username") {
      return setUsername(value);
    }
    setPassword(value);
    return;
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* App Logo */}
          <div className="flex justify-center">
            <div className="w-38 h-32 border-2 rounded-3xl border-gray-300 flex items-center justify-center bg-gray-50">
              <Image
                src="/logo.png"
                alt="App Logo"
                width={192}
                height={128}
                className="text-gray-500"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <FormLabel
                htmlFor="username"
                className="text-sm font-medium text-gray-700">
                Username
              </FormLabel>
              <TextField
                id="username"
                value={username}
                onChange={(e) => {
                  handleOnChange({ e, type: "username" });
                }}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <FormLabel
                htmlFor="password"
                className="text-sm font-medium text-gray-700">
                Password
              </FormLabel>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  handleOnChange({ e, type: "password" });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="button"
              variant="outlined"
              disabled={isPendingLogin}
              onClick={() => {
                console.log("login", username);
                handleOnClickLogin({ username, password });
              }}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors duration-200">
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column - Illustration/Background */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100 relative">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            // src="/login-jm.jpeg"
            src="/logo.png"
            alt="App Illustration/Background"
            width={800}
            height={600}
            className="max-w-full max-h-auto object-fill"
            priority
          />
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-medium text-gray-600 bg-white/80 px-4 py-2 rounded-lg">
            App Illustration/Background
          </span>
        </div> */}
      </div>

      {/* Mobile Background - Hidden on larger screens */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"></div>
      </div>
    </div>
  );
}
