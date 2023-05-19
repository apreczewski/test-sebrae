"use client";

import React, { useState } from "react";
import { api } from "@/services";
import { Form } from "@unform/web";
import { Input } from "@/components/Input";

type AddressProps = {
  logradouro: string,
  localidade: string,
  bairro: string
  cep: string
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressProps | null>(null);

  const handleCEP = async (data: any) => {
    setLoading(true);

    const { cep } = data

    const response = await api.get(`/${cep}/json/`);

    setAddress(response?.data)
    setLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Buscar CEP
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Digite CEP desejado para realizar a busca.</p>
        </div>
        <Form className="mt-5 sm:flex sm:items-center" onSubmit={handleCEP}>
          <div className="w-full sm:max-w-xs">
            <Input
              type="number"
              name="cep"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            search
          </button>
        </Form>

      {loading && (
        <h1>loading...</h1>
      )}

      {!loading && (
        <div className="mt-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Enredeço
          </h2>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rua
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                value={address?.logradouro}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cidade
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="cidade"
                id="cidade"
                autoComplete="cidade"
                value={address?.localidade}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Bairro
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="bairro"
                id="bairro"
                autoComplete="bairro"
                value={address?.bairro}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CEP
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="cep"
                id="cep"
                autoComplete="cep"
                value={address?.cep}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
