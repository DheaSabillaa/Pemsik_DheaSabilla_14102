import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Form = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Masukkan email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Masukkan password" />
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Login
      </Button>
    </form>
  );
};

export default Form;
