import {
  Avatar,
  Box,
  Card,
  CardProps,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React, { ChangeEvent, ChangeEventHandler, MouseEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const getAvatarInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export const customers: Customer[] = [
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street',
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road',
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive',
    },
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: 1555016400000,
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street',
    },
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247',
    },
    avatarUrl: '/static/images/avatars/avatar_6.png',
    createdAt: 1554757200000,
    email: 'clarke.gillebert@devias.io',
    name: 'Clarke Gillebert',
    phone: '972-333-4106',
  },
  {
    id: uuid(),
    address: { country: 'USA', state: 'California', city: 'Bakerfield', street: '317 Angus Road' },
    avatarUrl: '/static/images/avatars/avatar_1.png',
    createdAt: 1554670800000,
    email: 'adam.denisov@devias.io',
    name: 'Adam Denisov',
    phone: '858-602-3409',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'California',
      city: 'Redondo Beach',
      street: '2188  Armbrester Drive',
    },
    avatarUrl: '/static/images/avatars/avatar_7.png',
    createdAt: 1554325200000,
    email: 'ava.gregoraci@devias.io',
    name: 'Ava Gregoraci',
    phone: '415-907-2647',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Nevada',
      city: 'Las Vegas',
      street: '1798  Hickory Ridge Drive',
    },
    avatarUrl: '/static/images/avatars/avatar_8.png',
    createdAt: 1523048400000,
    email: 'emilee.simchenko@devias.io',
    name: 'Emilee Simchenko',
    phone: '702-661-1654',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Michigan',
      city: 'Detroit',
      street: '3934  Wildrose Lane',
    },
    avatarUrl: '/static/images/avatars/avatar_9.png',
    createdAt: 1554702800000,
    email: 'kwak.seong.min@devias.io',
    name: 'Kwak Seong-Min',
    phone: '313-812-8947',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
  },
];

type Customer = {
  id: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  avatarUrl: string;
  createdAt: number;
  email: string;
  name: string;
  phone: string;
};

type CustomerListResultsProps = {
  customers: Customer[];
} & CardProps;

export const CustomerListResults = ({ customers, ...others }: CustomerListResultsProps) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let newSelectedCustomerIds: string[] = [];

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const makeOnChange = (id: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const selectedIndex = selectedCustomerIds.indexOf(id);
      let newSelectedCustomerIds: string[] = [];

      if (selectedIndex === -1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
      } else if (selectedIndex === 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      } else if (selectedIndex === selectedCustomerIds.length - 1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(
          selectedCustomerIds.slice(0, selectedIndex),
          selectedCustomerIds.slice(selectedIndex + 1)
        );
      }

      setSelectedCustomerIds(newSelectedCustomerIds);
    };
  };

  const handleLimitChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const newLimit = parseInt(event.target.value);
    if (!isNaN(newLimit)) {
      setLimit(newLimit);
    }
  };

  const handlePageChange = (ev: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card {...others}>
      <Box sx={{ minWidth: 1050, maxHeight: '300px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedCustomerIds.length === customers.length}
                  color='primary'
                  indeterminate={
                    selectedCustomerIds.length > 0 && selectedCustomerIds.length < customers.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Registration date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(0, limit).map((customer: Customer) => (
              <TableRow
                hover
                key={customer.id}
                selected={selectedCustomerIds.indexOf(customer.id) !== -1}
              >
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                    onChange={makeOnChange(customer.id)}
                    value='true'
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                      {getAvatarInitials(customer.name)}
                    </Avatar>
                    <Typography color='textPrimary' variant='body1'>
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{format(customer.createdAt, 'dd/MM/yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component='div'
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
