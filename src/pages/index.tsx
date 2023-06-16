import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import nut from "~/../public/images/nut.png";
import sadSquirrel from "~/../public/images/sadSquirrel.png";
import happySquirrel from "~/../public/images/happySquirrel.png";
import { Button } from "~/components/Button";
import { ConnectWallet } from "~/components/ConnetWallet";
import config from "~/config/config";
import logo from "~/../public/images/logo.png";
const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState(1);
  const { data, isLoading, isSuccess, isError, error, writeAsync } =
    useContractWrite({
      abi: config.contract_abi,
      address: config.contract_address as `0x${string}`,
      functionName: "mint",
    });

  return (
    <>
      <Head>
        <title>Squirrels NFT</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-vt flex min-h-screen flex-col items-center justify-center bg-forrest bg-cover bg-center bg-no-repeat">
        <div className="container flex h-full flex-col items-center justify-between gap-12  px-4 py-16 text-amber-800">
          <div className="flex flex-col gap-y-4 rounded-xl bg-black bg-opacity-40 py-16">
            {/* <div className="flex flex-row items-center justify-center gap-x-4">
              <Image src={nut} alt="Squirrels NFT" width={120} height={120} />
              <h1 className="text-6xl font-extrabold tracking-tight sm:text-[5rem]">
                Deez Nuts
              </h1>
              <Image
                src={nut}
                alt="Squirrels NFT"
                width={120}
                height={120}
                className="scale-x-[-1]"
              />
            </div> */}
            <Image src={logo} alt="Squirrels NFT" width={300} height={300} />
            <p className="text-center text-2xl font-bold text-white">
              Each squirrel costs {config.price} ETH
            </p>
            {isConnected && (
              <div className="flex flex-row justify-center gap-x-4">
                <Button
                  onClick={() => {
                    if (amount > 1) {
                      setAmount(amount - 1);
                    }
                  }}
                  title="-"
                  signSize="small"
                />
                <Button
                  onClick={() => {
                    if (amount < 10) {
                      setAmount(amount + 1);
                    }
                  }}
                  title="+"
                  signSize="small"
                />
              </div>
            )}
          </div>
          {isConnected ? (
            <>
              {!isLoading && !isError && !isSuccess && (
                <Button
                  onClick={async () => {
                    writeAsync({
                      args: [amount],
                      value: parseEther(`${config.price * amount}`),
                    });
                  }}
                  title={`Mint ${amount ? amount : ""}`}
                  signSize="large"
                />
              )}

              {isLoading && (
                <Image
                  src={nut}
                  alt="Squirrels NFT"
                  width={120}
                  height={120}
                  className="animate-pulse"
                />
              )}

              {isSuccess && (
                <div className="flex flex-col items-center justify-center text-white">
                  <Image
                    src={happySquirrel}
                    alt="Squirrels NFT"
                    width={120}
                    height={120}
                    className="rounded-full shadow-md"
                  />
                  <p className="text-center text-2xl font-bold">
                    Minted successfully! <br />
                    Transaction hash:
                    <a
                      href={`https://etherscan.io/tx/${data?.hash}`}
                      target="_blank"
                    >
                      {data?.hash}
                    </a>
                  </p>
                </div>
              )}

              {isError && (
                <div className="flex flex-col items-center justify-center text-red-500">
                  <Image
                    src={sadSquirrel}
                    alt="Squirrels NFT"
                    width={120}
                    height={120}
                    className="rounded-full shadow-md"
                  />
                  <p className="text-center text-2xl font-bold text-white">
                    {error?.message.split(".")[0]}
                  </p>
                </div>
              )}
            </>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
