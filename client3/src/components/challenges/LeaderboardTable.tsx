import { CustomPaginationActions, TableHeadCellType } from '@/components/table/SortableTable';
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ChangeEventHandler, memo, MouseEvent, MouseEventHandler, useState } from 'react';

type RowPerPage = {
  label: string;
  value: number;
};

type Order = 'asc' | 'desc';

type OrderDetail<TRow> = {
  order: Order;
  by: keyof TRow;
};

export type TableRowType = {
  id: string;
  rank: string;
  applicantName: string;
  totalAccuracy: string;
  totalScore: string;
  elapsedTime: string;
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

function getMultiComparator(orderList: OrderDetail<TableRowType>[]) {
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

const CustomTableHead = ({
  checkboxHead = false,
  onClickSelectAll,
  numSelected,
  rowCount,
  onRequestSort,
  orderList,
  multiSortable,
  headCells,
}: {
  checkboxHead?: boolean;
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TableRowType) => void;
  onClickSelectAll: ChangeEventHandler<HTMLInputElement>;
  rowCount: number;
  orderList: OrderDetail<TableRowType>[];
  multiSortable: boolean;
  headCells: readonly TableHeadCellType<TableRowType>[];
}) => {
  const createSortHandler = (property: keyof TableRowType): MouseEventHandler<unknown> => {
    return (event) => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableHead>
      <TableRow>
        {checkboxHead && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onClickSelectAll}
            />
          </TableCell>
        )}

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

export const LeaderboardTable = memo(
  ({
    title,
    checkboxHead = false,
    rows,
    headCells,
    multiSortable = true,
    rowsPerPageOptions = [
      { label: '10', value: 10 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      // { label: 'All', value: -1 },
    ],
  }: {
    title?: string;
    checkboxHead?: boolean;
    rows: TableRowType[];
    headCells: readonly TableHeadCellType<TableRowType>[];
    multiSortable?: boolean;
    rowsPerPageOptions?: RowPerPage[];
  }) => {
    const [orderList, setOrderList] = useState<OrderDetail<TableRowType>[]>([]);
    const [selectedIdList, setSelectedIdList] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<RowPerPage>(rowsPerPageOptions[0]);

    const onRequestSingleSort = (event: MouseEvent<unknown>, property: keyof TableRowType) => {
      // const initialOrder = headCells.find(({ id }) => id === property)?.defaultOrder;
      const target = orderList?.find(({ by }) => by === property);
      if (!target) {
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
      <>
        {/* <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}> */}
        {/* <CustomToolbar numSelected={selectedIdList.length} /> */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: '100%' }} size='small'>
            <CustomTableHead
              checkboxHead={checkboxHead}
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
                .map(({ id, applicantName, totalScore, rank, totalAccuracy, elapsedTime }) => {
                  const selected = isSelectedId(id);

                  return (
                    <TableRow
                      hover={true}
                      onClick={makeOnClickRow(id)}
                      role='checkbox'
                      tabIndex={-1}
                      key={id}
                      selected={selected}
                    >
                      {checkboxHead && (
                        <TableCell padding='checkbox'>
                          <Checkbox color='primary' checked={selected} />
                        </TableCell>
                      )}

                      <TableCell component='th' align='center' scope='row' padding='none'>
                        {rank}
                      </TableCell>

                      <TableCell component='th' align='center' padding='normal'>
                        {applicantName}
                      </TableCell>

                      <TableCell component='th' align='center' padding='normal'>
                        {totalAccuracy}
                      </TableCell>

                      <TableCell component='th' align='center' padding='normal'>
                        {totalScore}
                      </TableCell>

                      <TableCell component='th' align='center' padding='normal'>
                        {elapsedTime}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow sx={{ height: 33 * emptyRows }} style={{}}>
                  <TableCell colSpan={headCells.length} />
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
          SelectProps={{ native: true }}
          ActionsComponent={CustomPaginationActions}
        />
        {/* {<pre>{JSON.stringify(orderList ?? {}, null, 2)}</pre>} */}
        {/* </Paper> */}
      </>
    );
  }
);
