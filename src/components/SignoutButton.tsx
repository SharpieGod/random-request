"use client";
import React from "react";
import DarkoButton from "./Darko/DarkoButton";
import { logOut } from "~/server/auth";

const SignoutButton = () => {
  return (
    <DarkoButton variant="secondary" onClick={logOut}>
      Logout
    </DarkoButton>
  );
};

export default SignoutButton;
