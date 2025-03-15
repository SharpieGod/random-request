"use client";

import { debounce } from "lodash";
import { Key, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import DarkoButton from "./Darko/DarkoButton";
import SelectElement from "./Darko/SelectElement";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";

const AccountView = ({
  user,
  defaultKeys,
}: {
  user: Omit<User, "password">;
  defaultKeys: Key[];
}) => {
  const [keys, setKeys] = useState<Key[]>(defaultKeys);
  const { data: keysData } = api.key.getKeys.useQuery();
  const utils = api.useUtils();

  useEffect(() => {
    if (keysData) {
      setKeys(
        keysData.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()),
      );
    }
  }, [keysData]);

  const { mutate: newKey, isPending: isLoadingNewKey } =
    api.key.createKey.useMutation({
      onSuccess: (data) => {
        setKeys(
          [...keys, data].sort(
            (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf(),
          ),
        );
        toast.success("Key created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: updateKey } = api.key.updateKey.useMutation({
    onSettled: async () => {
      await utils.key.getKeys.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  useEffect(() => {
    if (keysData) {
      setKeys((prevKeys) => {
        // Keep local edits if they exist, otherwise update with new data
        const updatedKeys = keysData.map((newKey) => {
          const existingKey = prevKeys.find((k) => k.id === newKey.id);
          return existingKey ?? newKey;
        });

        return updatedKeys.sort(
          (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf(),
        );
      });
    }
  }, [keysData]);

  const debouncedUpdateKey = debounce((updateKey: any, key: any) => {
    updateKey({
      keyId: key.id,
      keyType: key.keyType,
      numberType: key.numberType,
      lowerBound: key.lowerBound,
      upperBound: key.upperBound,
    });
  }, 500);

  return (
    <div>
      <div className="mx-auto flex w-3/5 flex-col gap-8">
        {keys.length == 0 ? (
          <span className="text-text-50 text-2xl opacity-80">
            You currently don&apos;t have any keys
          </span>
        ) : null}
        {keys.length != 0
          ? keys.map((key) => (
              <div key={key.id} className="flex w-full flex-col gap-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="flex w-full gap-2">
                    <div className="flex w-full flex-col gap-1">
                      <span>Key Type</span>
                      <SelectElement
                        selected={{
                          value: key.keyType,
                          label: key.keyType == "RANDOM" ? "Random" : "Range",
                        }}
                        options={[
                          { label: "Random", value: "RANDOM" },
                          { label: "Range", value: "RANGE" },
                        ]}
                        setSelected={(option) => {
                          if (option) {
                            setKeys(
                              keys.map((k) =>
                                k.id === key.id
                                  ? {
                                      ...k,
                                      keyType: option.value as
                                        | "RANDOM"
                                        | "RANGE",
                                    }
                                  : k,
                              ),
                            );

                            updateKey({
                              ...key,
                              keyId: key.id,
                              keyType: option.value as "RANDOM" | "RANGE",
                            });
                          }
                        }}
                        disabled={isLoadingNewKey}
                        placeholder="Select Type"
                      />
                    </div>
                    {key.keyType == "RANGE" ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <span>Lower Bounds</span>
                          <input
                            value={key.lowerBound}
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(
                                /^0/g,
                                "",
                              );

                              const newValue =
                                key.numberType === "INTEGER"
                                  ? isNaN(parseInt(e.target.value))
                                    ? 0
                                    : parseInt(e.target.value)
                                  : isNaN(parseFloat(e.target.value))
                                    ? 0
                                    : parseFloat(e.target.value);

                              const updatedKey = {
                                ...key,
                                lowerBound: newValue,
                              };
                              setKeys(
                                keys.map((k) =>
                                  k.id === key.id ? updatedKey : k,
                                ),
                              );

                              debouncedUpdateKey(updateKey, updatedKey);
                            }}
                            type="number"
                            pattern="[0-9]*"
                            className="border-background-800 placeholder:text-text-200 focus:border-background-600 w-full rounded-lg border bg-transparent p-3 invalid:border-red-300 focus:outline-none"
                            placeholder="Lower Bound"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>Upper Bounds</span>
                          <input
                            value={key.upperBound}
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(
                                /^0/g,
                                "",
                              );
                              const newValue =
                                key.numberType === "INTEGER"
                                  ? isNaN(parseInt(e.target.value))
                                    ? 0
                                    : parseInt(e.target.value)
                                  : isNaN(parseFloat(e.target.value))
                                    ? 0
                                    : parseFloat(e.target.value);

                              const updatedKey = {
                                ...key,
                                upperBound: newValue,
                              };
                              setKeys(
                                keys.map((k) =>
                                  k.id === key.id ? updatedKey : k,
                                ),
                              );

                              debouncedUpdateKey(updateKey, updatedKey);
                            }}
                            type="number"
                            pattern="[0-9]*"
                            className="border-background-800 placeholder:text-text-200 focus:border-background-600 w-full rounded-lg border bg-transparent p-3 invalid:border-red-300 focus:outline-none"
                            placeholder="Upper Bound"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex w-1/3 flex-col gap-1">
                    <span>Number Type</span>
                    <SelectElement
                      selected={{
                        value: key.numberType,
                        label:
                          key.numberType == "INTEGER" ? "Integer" : "Float",
                      }}
                      options={[
                        { label: "Integer", value: "INTEGER" },
                        { label: "Float", value: "FLOAT" },
                      ]}
                      setSelected={(option) => {
                        if (option) {
                          setKeys(
                            keys.map((k) =>
                              k.id === key.id
                                ? {
                                    ...k,
                                    numberType: option.value as
                                      | "INTEGER"
                                      | "FLOAT",
                                    upperBound:
                                      key.numberType == "INTEGER"
                                        ? isNaN(
                                            parseInt(key.upperBound.toString()),
                                          )
                                          ? 0
                                          : parseInt(key.upperBound.toString())
                                        : isNaN(
                                              parseFloat(
                                                key.upperBound.toString(),
                                              ),
                                            )
                                          ? 0
                                          : parseFloat(
                                              key.upperBound.toString(),
                                            ),
                                    lowerBound:
                                      key.numberType == "INTEGER"
                                        ? isNaN(
                                            parseInt(key.lowerBound.toString()),
                                          )
                                          ? 0
                                          : parseInt(key.lowerBound.toString())
                                        : isNaN(
                                              parseFloat(
                                                key.lowerBound.toString(),
                                              ),
                                            )
                                          ? 0
                                          : parseFloat(
                                              key.lowerBound.toString(),
                                            ),
                                  }
                                : k,
                            ),
                          );

                          updateKey({
                            ...key,
                            keyId: key.id,
                            numberType: option.value as "INTEGER" | "FLOAT",
                          });
                        }
                      }}
                      disabled={isLoadingNewKey}
                      placeholder="Select Type"
                    />
                  </div>
                </div>
                <span
                  onClick={async () => {
                    await navigator.clipboard.writeText(key.id);
                    toast.success("Copied to clipboard");
                  }}
                  className="bg-background-800 border-background-700 hover:bg-background-700 flex w-1/3 cursor-pointer items-center justify-between rounded-lg border p-2 transition-colors"
                >
                  {key.id}
                  <FaRegCopy />
                </span>
              </div>
            ))
          : null}
        <DarkoButton
          disabled={isLoadingNewKey}
          onClick={() => newKey()}
          variant="primary"
        >
          New Key
        </DarkoButton>
      </div>
    </div>
  );
};

export default AccountView;
