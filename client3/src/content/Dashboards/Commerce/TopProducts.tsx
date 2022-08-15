import { useRefMounted } from '@/hooks/useRefMounted';
import { topProductsApi } from '@/mocks/top_products';
import { TopProduct } from '@/models/top_products';
import { ArrowForwardTwoTone as ArrowForwardTwoToneIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import numeral from 'numeral';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TopProducts() {
  const isMountedRef = useRefMounted();
  const [products, setProducts] = useState<TopProduct[]>([]);
  const { t } = useTranslation();
  const theme = useTheme();

  const getTopProducts = useCallback(async () => {
    try {
      const response = await topProductsApi.getTopProducts();

      if (isMountedRef()) {
        setProducts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getTopProducts();
  }, [getTopProducts]);

  return (
    <Card>
      <CardHeader
        title={t('Top Products')}
        action={
          <Button
            variant='contained'
            size='small'
            endIcon={<ArrowForwardTwoToneIcon fontSize='small' />}
          >
            {t('Create Product')}
          </Button>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Product')}</TableCell>
              <TableCell align='right'>{t('Orders')}</TableCell>
              <TableCell align='right'>{t('Revenue')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(0, 3).map((product) => (
              <TableRow hover key={product.id}>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    <Avatar
                      sx={{
                        mr: 2,
                        width: theme.spacing(8.185),
                        height: theme.spacing(8.185),
                      }}
                      variant='square'
                      alt={product.name}
                      src={product.image}
                    />
                    <Typography variant='h4' sx={{ fontWeight: 'normal' }} noWrap>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h4'>{product.orders}</Typography>
                  <Typography variant='subtitle2' noWrap>
                    {product.inventory} {t('units')}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h4'>
                    {numeral(product.revenue).format(`${product.currency}0,0.00`)}
                  </Typography>
                  <Typography variant='subtitle2' noWrap>
                    {product.revenuePercent}
                    {t('% of sales')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2} display='flex' justifyContent='center'>
        <Button variant='outlined'>{t('View all Products')}</Button>
      </Box>
    </Card>
  );
}

export default TopProducts;
