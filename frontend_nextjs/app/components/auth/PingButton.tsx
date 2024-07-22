"use client";

import {useEffect, useState} from "react";
import {forceRefreshToken, getHello, getMoney, ping,} from "@/app/components/auth/auth-test-actions";

export default function PingButton() {
  const [pingStatus, setPingStatus] = useState("");
  const [refreshTokenStatus, setRefreshTokenStatus] = useState("");
  const [helloStatus, setHelloStatus] = useState("");
  const [moneyStatus, setMoneyStatus] = useState("");

  const handlePing = async () => {
    setPingStatus("");
    const result = await ping();
    setPingStatus(result);
  };

  const handleRefreshToken = async () => {
    setRefreshTokenStatus("");
    const result = await forceRefreshToken();
    setRefreshTokenStatus(result);
  };

  const handleGetHello = async () => {
    setHelloStatus("");
    const result = await getHello();
    setHelloStatus(result);
  };

  const handleGetMoney = async () => {
    setMoneyStatus("");
    const result = await getMoney();
    setMoneyStatus(result);
  };

  return (
    <div className="container mx-auto mb-8 flex w-full flex-col justify-center space-y-4">
      <div className={"mt-4 w-full space-y-4 border border-gray-300 p-4"}>
        <h2 className={"text-2xl font-bold"}>Server Actions</h2>

        <MonsterButton
          buttonLabel={"Ping! (Keycloak User Info Endpoint)"}
          onButtonClick={handlePing}
          status={pingStatus}
        />
        <MonsterButton
          buttonLabel={"Force Refreh Token (Keycloak)"}
          onButtonClick={handleRefreshToken}
          status={refreshTokenStatus}
        />
        <MonsterButton
          buttonLabel={"Get Hello from service 👋 (Unprotected Java Service)"}
          onButtonClick={handleGetHello}
          status={helloStatus}
        />

        <MonsterButton
          buttonLabel={"Get Money from service 🤑 (Protected Java Service)"}
          onButtonClick={handleGetMoney}
          status={moneyStatus}
        />
      </div>
    </div>
  );
}

const showTime = false;

function MonsterButton({
  buttonLabel,
  onButtonClick,
  status,
}: {
  buttonLabel: string;
  onButtonClick: () => void;
  status: string;
}) {
  const [x, setX] = useState(0);

  useEffect(() => {
    if (showTime) {
    const startAt = Date.now();
    const iId = setInterval(() => {
      setX(Date.now() - startAt);
    }, 200);

    return () => clearInterval(iId);
    }
  }, [status]);

  return (
    <div className={"w-full border border-gray-300 p-4"}>
      <div className={"flex flex-col"}>
        <button className={"bg-amber-200 p-4 text-2xl"} onClick={onButtonClick}>
          {buttonLabel} ({x}ms)
        </button>
        <div className={"border-gray-300 p-4"}>{status}</div>
      </div>
    </div>
  );
}
