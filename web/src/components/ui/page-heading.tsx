import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export function PageHeading({ label, href }: { label: string; href: string }) {
  return (
    <nav className='flex borderz fixed w-full p-4 border-solid top-0'>
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div className='flex'>
            <a href='/' className='text-sm font-extrabold text-gray-800 hover:text-gray-600'>
              Aurastamp
            </a>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <ChevronRightIcon className='h-5 w-5 flex-shrink-0 text-gray-500 mr-4' />
            <a href={href} className='text-sm font-extrabold text-gray-800 hover:text-gray-600'>
              {label}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}
