"use client";

import Loader from "@/components/Loader";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const router = useRouter();

  //   useEffect(() => {
  //     const role = user?.publicMetadata?.role;

  //     if (role) {
  //       router.push(`/${role}`);
  //     }
  //   }, [user, router]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = user?.publicMetadata?.role;

    if (role) {
      router.replace(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  // console.log("user", user);
  // console.log("user", user?.username);
  // console.log("user", user?.firstName);
  // console.log("user", user?.hasImage);
  // console.log("user", user?.imageUrl);

  // 🔥 Loader while Clerk initializes
  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-sanikaSkyLight">
        <SignIn.Root>
          <SignIn.Step name="start">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <div className="flex gap-4 items-center ">
                <Image src="/logo.png" alt="logo" width={32} height={32} />
                <span className="">SchoolSanika</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please enter your credentials to login.
              </p>
              {/* <form> */}
              <Clerk.GlobalError className="text-sm text-rose-500" />
              <div className="mb-4">
                {/* <label
                    htmlFor="Username"
                    className="block text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="Username"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  /> */}
                <Clerk.Field name="identifier" className="flex flex-col gap-1 ">
                  <Clerk.Label className="text-gray-400 text-400">
                    Username
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    className="p-2 rounded-md ring-1 ring-gray-300"
                    required
                  />
                  <Clerk.FieldError className="text-xs text-rose-500" />
                </Clerk.Field>
              </div>
              <div className="mb-4">
                {/* <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  /> */}
                <Clerk.Field name="password" className="flex flex-col gap-1 ">
                  <Clerk.Label className="text-gray-400 text-400">
                    Password
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    className="p-2 rounded-md ring-1 ring-gray-300"
                    required
                  />
                  <Clerk.FieldError className="text-xs text-rose-500" />
                </Clerk.Field>
              </div>
              {/* <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button> */}
              <SignIn.Action
                submit
                className="bg-blue-500 text-white text-sm my-1 rounded-md p-2 w-[100%]"
              >
                Sign In
              </SignIn.Action>
              {/* </form> */}
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </>
  );
};

export default LoginPage;
