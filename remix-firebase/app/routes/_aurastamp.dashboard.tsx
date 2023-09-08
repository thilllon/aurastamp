import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BarsArrowUpIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Cross2Icon, RowSpacingIcon } from '@radix-ui/react-icons';
import React, { Fragment } from 'react';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Domains', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

// const projects = [
//   {
//     name: 'Workcation',
//     href: '#',
//     siteHref: '#',
//     repoHref: '#',
//     repo: 'debbielewis/workcation',
//     tech: 'Laravel',
//     lastDeploy: '3h ago',
//     location: 'United states',
//     starred: true,
//     active: true,
//   },
//   // More projects...
// ];

const activityItems = [
  {
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  // More items...
];

function clsx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      {/* Background color split screen for large screens */}
      <div className="fixed left-0 top-0 h-full w-1/2 bg-white" aria-hidden="true" />
      <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="relative flex min-h-full flex-col">
        <CollapsibleDemo />
        {/* // -------------------------------- */}
        {/* // -------------------------------- */}
        {/* // -------------------------------- */}
        {/* // -------------------------------- */}
        {/* // -------------------------------- */}

        {/* Navbar */}
        <Disclosure as="nav" className="flex-shrink-0 bg-indigo-600">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  {/* Logo section */}
                  <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                      />
                    </div>
                  </div>

                  {/* Search section */}
                  <div className="flex flex-1 justify-center lg:justify-end">
                    <div className="w-full px-2 lg:px-6">
                      <label htmlFor="search" className="sr-only">
                        Search projects
                      </label>
                      <div className="relative text-indigo-200 focus-within:text-gray-400">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-indigo-400 bg-opacity-25 py-1.5 pl-10 pr-3 text-indigo-100 placeholder:text-indigo-200 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Search projects"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* Links section */}
                  <div className="hidden lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                      <div className="flex">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={clsx(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={clsx(
                        item.current
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-indigo-800 pb-3 pt-4">
                  <div className="space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* 3 column wrapper */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex">
            {/* Account profile */}
            <div className="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
              <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
                      {/* Profile */}
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">Debbie Lewis</div>
                          <a href="#a" className="group flex items-center space-x-2.5">
                            <svg
                              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              Box
                              <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                              debbielewis
                            </span>
                          </a>
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row xl:flex-col">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 xl:w-full"
                        >
                          New Project
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 xl:ml-0 xl:mt-3 xl:w-full"
                        >
                          Invite Team
                        </button>
                      </div>
                    </div>
                    {/* Meta info */}
                    <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
                      <div className="flex items-center space-x-2">
                        <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-500">Pro Member</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-500">8 Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="border-b border-t border-gray-200 pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
                <div className="flex items-center">
                  <h1 className="flex-1 text-lg font-medium">Projects</h1>
                  <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <BarsArrowUpIcon
                        className="-ml-0.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Sort
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#a"
                              className={clsx(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Name
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#a"
                              className={clsx(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Date modified
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#a"
                              className={clsx(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Date created
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Activity feed */}
          <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
            <div className="pl-6 lg:w-80">
              <div className="pb-2 pt-6">
                <h2 className="text-sm font-semibold">Activity</h2>
              </div>
              <div>
                <ul className="divide-y divide-gray-200">
                  {activityItems.map((item) => (
                    <li key={item.commit} className="py-4">
                      <div className="flex space-x-3">
                        <img
                          className="h-6 w-6 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                          alt=""
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">You</h3>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Deployed {item.project} ({item.commit} in master) to {item.environment}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 py-4 text-sm">
                  <a href="#a" className="font-semibold text-indigo-600 hover:text-indigo-900">
                    View all activity
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CollapsibleDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root className="w-[300px]" open={open} onOpenChange={setOpen}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="text-violet11 text-[15px] leading-[25px]" style={{ color: 'white' }}>
          @peduarte starred 3 repositories
        </span>
        <Collapsible.Trigger asChild>
          <button className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </Collapsible.Trigger>
      </div>

      <div className="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
        <span className="text-violet11 text-[15px] leading-[25px]">@radix-ui/primitives</span>
      </div>

      <Collapsible.Content>
        <div className="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
          <span className="text-violet11 text-[15px] leading-[25px]">@radix-ui/colors</span>
        </div>
        <div className="bg-white rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA7">
          <span className="text-violet11 text-[15px] leading-[25px]">@stitches/react</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
