"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Form } from "@unform/web";
import { db } from "@/services";
import { UserProps } from "../page";

import { Input } from "@/components/Input";

interface EditProps {
  params: {
    id: string;
  };
}

const Edit = ({ params }: EditProps) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const handleEdit = async (data: any) => {
    const { name, description } = data;
    db.put(`/conta/${id}`, {
      id,
      name,
      description,
    });
  };

  const handleLoadData = useCallback(async () => {
    setLoading(true);
    const response = await db.get(`/conta/${id}`);
    setUser(response.data);
    setLoading(false);
  },[id])

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Form className="mt-5 sm:flex sm:items-center" onSubmit={handleEdit} initialData={user}>
      <div className="w-full sm:max-w-xs mr-2">
        <Input
          type="text"
          name="name"
          value={user?.name}
          // className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          // placeholder="Nome"
        />
      </div>
      <div className="w-full sm:max-w-xs">
        <Input
          type="text"
          name="description"
          value={user?.description}
          // className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          // placeholder="Descrição"
        />
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
      >
        salvar
      </button>
    </Form>
  );
};

export default Edit;
