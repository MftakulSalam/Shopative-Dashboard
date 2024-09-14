/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSession } from "next-auth/react";
import LoginPage from "@/components/layouts/login";
import AppShell from "@/components/layouts/AppShell";
import Image from "next/image";
import moment from 'moment';


export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <LoginPage />;
  }

  function getGreeting() {
    const hour = moment().hour();
    if (hour < 11) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  return (
    <AppShell>
      <div className="font-urbanist flex w-full py-5 px-7 justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{getGreeting()}, {session?.user?.name}!</h1>
          <h2 className="text-zinc-400 text-sm">12th Sep 2024</h2>
        </div>
        <div className="flex gap-4 items-center">
          <Image
            className="h-10 w-10 rounded-full"
            width={100}
            height={100}
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
          />
          <h1 className="font-poppins text-xl">{session?.user?.name}</h1>
        </div>
      </div>
    </AppShell>
  );
}
