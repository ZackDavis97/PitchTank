import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Select = ({ event, data }) => {
  const [country] = useState(data);
  const [selected, setSelected] = useState(country[0]);
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white dark:bg-darkLight py-2 pl-3 pr-10 text-left text-gray-500 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <span className="block truncate">{selected}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-[100] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-darkLight py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {country.map((country, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-primary text-white"
                            : "text-gray-900 dark:text-white",
                          "relative cursor-pointer select-none"
                        )
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate py-2 pl-8 pr-4"
                            )}
                            onClick={(e) => {
                              event(e);
                            }}
                          >
                            {country}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primary",
                                "absolute inset-y-0 left-0 flex items-center pl-1.5"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

export default Select;