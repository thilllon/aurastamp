import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { ChangeEventHandler, memo, MouseEvent, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

type RowPerPage = {
  label: string;
  value: number;
};

type Order = 'asc' | 'desc';

type OrderDetail = {
  order: Order;
  by: keyof TableRowType;
};

export type TableRowType = {
  id: string;
  title: string;
  col11: number;
  col22: number;
  col33: number;
  col44: number;
  col55: number;
};

export type TableHeadCellType<TRow = TableRowType> = {
  disablePadding: boolean;
  id: keyof TRow;
  label: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  defaultOrder: 'desc'; // Order
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (v1: { [key in Key]: number | string }, v2: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (v1, v2) => descendingComparator(v1, v2, orderBy)
    : (v1, v2) => -descendingComparator(v1, v2, orderBy);
}

function getMultiComparator(orderList: OrderDetail[]) {
  return (a, b) => {
    for (const { order, by } of orderList) {
      const result = getComparator(order, by)(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

export const CustomTableHead = <THeadCell, TRow = TableRowType>({
  onClickSelectAll,
  numSelected,
  rowCount,
  onRequestSort,
  orderList,
  multiSortable,
  headCells,
}: {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TRow) => void;
  onClickSelectAll: ChangeEventHandler<HTMLInputElement>;
  rowCount: number;
  orderList: OrderDetail[];
  multiSortable: boolean;
  headCells: THeadCell extends TableHeadCellType
    ? readonly THeadCell[]
    : readonly TableHeadCellType[];
}) => {
  const createSortHandler = (property: keyof TRow): MouseEventHandler<unknown> => {
    return (event) => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onClickSelectAll}
          />
        </TableCell>

        {headCells.map((headCell) => {
          const current = orderList.find(({ by }) => by === headCell.id);
          const active = !!current;
          const sortIndex = orderList.findIndex(({ by }) => by === headCell.id);
          const si = sortIndex + 1 ? sortIndex + 1 : null;
          const align = headCell.align;
          return (
            <TableCell
              key={headCell.id}
              align={align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {multiSortable && align === 'right' && (
                <Typography variant='caption'>{si}</Typography>
              )}
              <TableSortLabel
                onClick={createSortHandler(headCell.id)}
                active={active}
                direction={current?.order ?? headCell.defaultOrder}
              >
                {headCell.label}
                {active && (
                  <Box component='span' sx={visuallyHidden}>
                    {current.order === 'desc' ? 'descending' : 'ascending'}
                  </Box>
                )}
              </TableSortLabel>
              {multiSortable && align === 'left' && <Typography variant='caption'>{si}</Typography>}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

export const CustomToolbar = ({
  numSelected,
  onDelete,
  onFilter,
  title = '',
}: {
  numSelected: number;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onFilter?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
}) => {
  const { t } = useTranslation();

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    onDelete?.(ev);
  };

  const onClickFilter: MouseEventHandler<HTMLButtonElement> = async (ev) => {
    onFilter?.(ev);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {`${numSelected} ${t('선택됨')}`}
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton onClick={onClickFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

export const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}) => {
  const theme = useTheme();

  const handleFirstPageButtonClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPageChange(ev, 0);
  };

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPageChange(ev, page - 1);
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPageChange(ev, page + 1);
  };

  const handleLastPageButtonClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    onPageChange(ev, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
};

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

export const SortableTable = memo(
  ({
    rows,
    headCells,
    multiSortable = true,
    rowsPerPageOptions = [
      { label: '10', value: 10 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: 'All', value: -1 },
    ],
  }: {
    rows: TableRowType[];
    headCells: readonly TableHeadCellType[];
    multiSortable?: boolean;
    rowsPerPageOptions?: RowPerPage[];
  }) => {
    const [orderList, setOrderList] = useState<OrderDetail[]>([]);
    const [selectedIdList, setSelectedIdList] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<RowPerPage>(rowsPerPageOptions[0]);

    const onRequestSingleSort = (event: MouseEvent<unknown>, property: keyof TableRowType) => {
      // const initialOrder = headCells.find(({ id }) => id === property)?.defaultOrder;
      const target = orderList?.find(({ by }) => by === property);
      if (!target) {
        // 추가
        setOrderList([{ order: 'desc', by: property }]);
      } else if (target.order === 'desc') {
        setOrderList([{ order: 'asc', by: property }]);
      } else {
        setOrderList([]);
      }
    };

    const onRequestMultiSort = (event: MouseEvent<unknown>, property: keyof TableRowType) => {
      // const initialOrder = headCells.find(({ id }) => id === property)?.defaultOrder;
      const target = orderList.find(({ by }) => by === property);
      if (!target) {
        // 추가
        const newOrderList = orderList.concat({ order: 'desc', by: property });
        setOrderList(newOrderList);
      } else if (target.order === 'asc') {
        // 제거
        const newOrderList = orderList.filter(({ by }) => by !== property);
        setOrderList(newOrderList);
      } else {
        // 변경
        const newOrderList = orderList
          .filter(({ by }) => by !== property)
          .concat({ order: 'asc', by: property });
        setOrderList(newOrderList);
      }
    };

    const onClickSelectAll: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map(({ id }) => id);
        setSelectedIdList(newSelecteds);
        return;
      }
      setSelectedIdList([]);
    };

    const makeOnClickRow = (id: string): MouseEventHandler<HTMLTableRowElement> => {
      return (event) => {
        const selectedIndex = selectedIdList.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedIdList, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedIdList.slice(1));
        } else if (selectedIndex === selectedIdList.length - 1) {
          newSelected = newSelected.concat(selectedIdList.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedIdList.slice(0, selectedIndex),
            selectedIdList.slice(selectedIndex + 1)
          );
        }

        setSelectedIdList(newSelected);
      };
    };

    const onPageChange = (
      event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
      newPage: number
    ) => {
      setPage(newPage);
    };

    const onRowsPerPageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const option = rowsPerPageOptions.find(({ value }) => value === parseInt(event.target.value));
      setRowsPerPage(option);
      setPage(0);
    };

    const isSelectedId = (id: string) => selectedIdList.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage.value - rows.length) : 0;

    return (
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <CustomToolbar numSelected={selectedIdList.length} />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: '100%' }} size='small'>
            <CustomTableHead
              headCells={headCells}
              numSelected={selectedIdList.length}
              onClickSelectAll={onClickSelectAll}
              onRequestSort={multiSortable ? onRequestMultiSort : onRequestSingleSort}
              rowCount={rows.length}
              orderList={orderList}
              multiSortable={multiSortable}
            />

            <TableBody>
              {rows
                .sort(getMultiComparator(orderList))
                .slice(page * rowsPerPage.value, (page + 1) * rowsPerPage.value)
                .map((row) => {
                  const selected = isSelectedId(row.id);

                  return (
                    <TableRow
                      hover={true}
                      onClick={makeOnClickRow(row.id)}
                      role='checkbox'
                      tabIndex={-1}
                      key={row.id}
                      selected={selected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox color='primary' checked={selected} />
                      </TableCell>

                      <TableCell component='th' scope='row' padding='none'>
                        {row.title}
                      </TableCell>

                      <TableCell component='th' align='right' padding='normal'>
                        {row.col11}
                      </TableCell>

                      <TableCell component='th' align='right' padding='normal'>
                        {row.col22}
                      </TableCell>

                      <TableCell component='th' align='right' padding='normal'>
                        {row.col33}
                      </TableCell>

                      <TableCell component='th' align='right' padding='normal'>
                        {row.col44}
                      </TableCell>

                      <TableCell component='th' align='right' padding='normal'>
                        {row.col55}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={9999} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage.value}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          colSpan={9999}
          SelectProps={{ native: true }}
          ActionsComponent={CustomPaginationActions}
        />

        {/* {<pre>{JSON.stringify(orderList ?? {}, null, 2)}</pre>} */}
      </Paper>
    );
  }
);
