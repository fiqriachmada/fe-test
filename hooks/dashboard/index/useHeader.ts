"use client";
import { useLogin } from "@/hooks/login/index/useLogin";

import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function useHeader() {
  const { logout, accessToken, formatRemainingTime } = useLogin();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const toastShownRef = useRef(false); // <- untuk mencegah spam toast
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = jwtDecode<{ exp?: number }>(accessToken);
    if (!decoded.exp) return;

    const checkTokenExpiry = () => {
      const expTime = decoded.exp! * 1000;
      const timeLeft = Math.max(0, expTime - Date.now());
      const secondsLeft = Math.floor(timeLeft / 1000);
      const timeFormat = formatRemainingTime({ ms: timeLeft });

      setTimeLeft(timeLeft);
      const minutes = 90;

      if (secondsLeft <= 0) {
        if (!toastShownRef.current) {
          toastShownRef.current = true;
          logout();
          toast.error("Session has expired. Please log in again.", {
            toastId: "session-expired",
          });
        }
      } else if (secondsLeft <= minutes) {
        const message = `Session will expire in ${secondsLeft} seconds`;

        if (!toastIdRef.current || !toast.isActive(toastIdRef.current)) {
          toastIdRef.current = toast.error(message, {
            toastId: "session-expiry",
            autoClose: secondsLeft * 1000, // biar nggak tertutup otomatis
          });
        } else {
          toast.update("session-expiry", {
            render: message,
          });
        }
      }
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 1000);

    return () => clearInterval(interval);
  }, []);
}

export default useHeader;
