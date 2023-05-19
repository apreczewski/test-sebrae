"use client";
import React, { useEffect, useState } from "react";
import { Form } from "@unform/web";
import { db } from "@/services";
import Image from "next/image";
import {
  UserCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Input } from "@/components/Input";

export type UserProps = {
  id?: string;
  name: string;
  description: string;
};

const Conta: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProps[] >([]);

  const handleCreate = async (data: any) => {
    setLoading(true);
    const { name, description } = data;
    db.post("/conta", {
      name,
      description,
    }).then(() => {
      loadData();
      setLoading(false);
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    if(id !== undefined){
      db.delete(`/conta/${id}`).then(() => {
        loadData();
        setLoading(false);
      });
    }
  };

  const loadData = async () => {
    const response = await db.get("/conta");
    if (Array.isArray(response.data)) {
      setUsers(response.data);
    } else {
      console.error('Erro: response.data não é um array!');
    }
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
          />
        </div>
        <div className="w-full sm:max-w-xs">
          <Input
            type="text"
            name="description"
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

      <ul role="list" className="divide-y divide-gray-100">
        {users?.length ? users.map((person) => (
            <li key={person.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <UserCircleIcon className="block h-6 w-6" aria-hidden="true" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Link href={`/conta/${person.id}`}>
                  <PencilSquareIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                </Link>
                <button onClick={() => {if(person?.id){handleDelete(person?.id)}} }>
                  <TrashIcon className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </li>
          )) : null}
      </ul>
    </>
  );
};

export default Conta;
