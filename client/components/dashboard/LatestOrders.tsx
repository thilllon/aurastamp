import { ArrowRight as ArrowRightIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova',
    },
    createdAt: 1555016400000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu',
    },
    createdAt: 1555016400000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson',
    },
    createdAt: 1554930000000,
    status: 'refunded',
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: { name: 'Anje Keizer' },
    createdAt: 1554757200000,
    status: 'pending',
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: { name: 'Clarke Gillebert' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: { name: 'Adam Denisov' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: { name: 'Adam Denisov' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: { name: 'Adam Denisov' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: { name: 'Adam Denisov' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: { name: 'Adam Denisov' },
    createdAt: 1554670800000,
    status: 'delivered',
  },
];

type LatestOrdersProps = CardProps;

export const LatestOrders = (props: LatestOrdersProps) => (
  <Card {...props}>
    <CardHeader title='Latest Orders' />
    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Ref</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell sortDirection='desc'>
              <Tooltip enterDelay={300} title='Sort'>
                <TableSortLabel active direction='desc'>
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow hover key={order.id}>
              <TableCell>{order.ref}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{format(order.createdAt, 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    (order.status === 'delivered' && 'success') ||
                    (order.status === 'refunded' && 'error') ||
                    'warning'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    {/* // ****************************** */}
    {/* // ****************************** */}

    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Ref</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell sortDirection='desc'>
              <Tooltip enterDelay={300} title='Sort'>
                <TableSortLabel active direction='desc'>
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow hover key={order.id}>
              <TableCell>{order.ref}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{format(order.createdAt, 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    (order.status === 'delivered' && 'success') ||
                    (order.status === 'refunded' && 'error') ||
                    'warning'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    {/* // ****************************** */}
    {/* // ****************************** */}

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <Button endIcon={<ArrowRightIcon fontSize='small' />} size='small'>
        View all
      </Button>
    </Box>
  </Card>
);
