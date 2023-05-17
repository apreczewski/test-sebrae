"use client";
import React, { useEffect, useState } from "react";
import { Form, Input } from "@rocketseat/unform";
import { db } from "@/services";

type UserProps = {
  id?: string;
  name: string;
  description: string;
};

const Conta: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProps[] | null>(null);

  const handleCreate = async (data: any) => {
    const { name, description } = data;
    db.post("/conta", {
      name,
      description,
    });
  };

  const handleEdit = async (data: any) => {
    const { id, name, description } = data;
    db.put(`/conta/${id}`, {
      id,
      name,
      description,
    });
  };

  const handleDelete = async (data: any) => {
    const { id } = data;
    db.delete(`/conta/${id}`);
  };

  const loadData = async () => {
    const response = await db.get("/conta");
    setUsers(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Form className="mt-5 sm:flex sm:items-center" onSubmit={handleCreate}>
        <div className="w-full sm:max-w-xs mr-2">
          <Input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nome"
          />
        </div>
        <div className="w-full sm:max-w-xs">
          <Input
            type="text"
            name="description"
            id="description"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Descrição"
          />
        </div>
        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
        >
          salvar
        </button>
      </Form>

      {loading && <h1>Loading...</h1>}

      <div className="mt-8">
        {!loading &&
          users &&
          users.map((user) => {
            return (
              <div key={user?.id}>
                <div className="w-full sm:max-w-xs mr-2">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={user?.name}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Nome"
                  />
                </div>
                <div className="w-full sm:max-w-xs">
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    value={user?.description}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Descrição"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                >
                  editar
                </button>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                >
                  excluir
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Conta;
