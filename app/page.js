"use client";

import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:3000/api/user/auth", {
        email,
        password,
      });
      setUserData(res.data);
      setIsLoggedIn(true);
      console.log(res.data.name);
      console.log(res.data._id);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (userData && userData._id) {
      setLoading(true);
      setError(null);
      try {
        await axios.delete("http://localhost:3000/api/delete", {
          data: { id: userData._id },
        });
        console.log("User deleted successfully");
        setUserData(null);
        setIsLoggedIn(false);
      } catch (err) {
        setError("Error deleting user. Please try again.");
        console.log("Error deleting user:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("User data is not available or user ID is missing.");
    }
  };

  return (
    <div>
      <h1 className="mx-auto mt-10 font-sans text-gray-700 font-semibold text-6xl capitalize">
        sign in
      </h1>
      <form onSubmit={handleSignin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          className="py-5 px-24 rounded-xl border-2 border-gray-400 focus:outline-none focus:shadow-md m-7"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          className="py-5 px-24 rounded-xl border-2 border-gray-400 focus:outline-none focus:shadow-md"
        />
        <button
          type="submit"
          className="p-5 border-2 border-gray-500 cursor-pointer rounded-3xl bg-slate-300 m-11"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {isLoggedIn && (
        <div className="mx-auto mt-9 text-6xl text-green-600">
          welcome {userData.name}
        </div>
      )}

      {isLoggedIn && (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex gap-4 justify-center items-center mt-9 mb-10 mx-auto w-screen h-96">
                <div className="text-3xl">Want to delete your account?</div>
                <button className="bg-red-500 text-red-50 px-7 py-3 rounded-3xl">
                  Delete user
                </button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
