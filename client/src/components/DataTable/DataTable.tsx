import { ReactNode }         from 'react';
import styled                from 'styled-components';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
}                             from '@mui/material';
import { EOrder }             from '../../utils/types';
import { DEFAULT_PAGE_SIZES } from '../../utils/constants';
import { DataTableLabel }     from './DataTableLabel';

export interface IDataTableCell {
  value  : ReactNode;
  align? : TAlignValues;
  title? : string;
}

type TAlignValues = 'left' | 'right' | 'center' | 'justify';

export interface IDataTableHeader {
  label    : string;
  align?   : TAlignValues;
  dataKey? : string;
}

export type TDataTableRow = Array<IDataTableCell>;

export interface IDataTableProps {
  rows                : TDataTableRow[];
  rowsPerPage         : number;
  totalItems          : number;
  order               : EOrder;
  orderBy             : string;
  page                : number;
  padding?            : string;
  headers?            : IDataTableHeader[];
  loading?            : boolean;
  noResultText?       : string;
  onPageChange        : (page: number) => void;
  onRowsPerPageChange : (rowsPerPage: number) => void;
  onColumnSort?       : (key: string) => void;
}

export const DataTable = ({
  rows,
  page,
  rowsPerPage,
  totalItems,
  order,
  orderBy,
  noResultText = 'no data',
  padding,
  headers,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onColumnSort,
}: IDataTableProps) => (
  <DataTable.Wrapper padding={padding}>
    <Table>
      {headers && (
        <TableHead>
          <DataTable.Headers>
            {headers.map((header: IDataTableHeader, headerIndex: number) => (
              <TableCell
                key       = {headerIndex}
                component = "th"
                scope     = "row"
                align     = {header.align ?? 'left'}
                style     = {{ width: 'auto' }}
              >
                {header.dataKey ? (
                  <DataTableLabel
                    item       = {header}
                    order      = {order}
                    orderBy    = {orderBy}
                    handleSort = {onColumnSort}
                  />
                ) : (
                  <>{header.label}</>
                )}
              </TableCell>
            ))}
          </DataTable.Headers>
        </TableHead>
      )}

      {!loading && !!rows.length && (
        <TableBody>
          {rows.map((row: TDataTableRow, rowIndex: number) => (
            <DataTable.Row key={rowIndex}>
              {row.map((cell: IDataTableCell, cellIndex: number) => (
                <TableCell key={cellIndex} align={cell.align ?? 'left'}>
                  {cell.value}
                </TableCell>
              ))}
            </DataTable.Row>
          ))}
        </TableBody>
      )}
    </Table>

    {!rows.length && noResultText && !loading ? (
      <DataTable.NoResult>{noResultText}</DataTable.NoResult>
    ) : (
      <>
        {loading && (
          <DataTable.Loading>
            <CircularProgress />
          </DataTable.Loading>
        )}
      </>
    )}

    <TablePagination
      rowsPerPageOptions  = {DEFAULT_PAGE_SIZES}
      component           = "div"
      count               = {totalItems}
      rowsPerPage         = {rowsPerPage}
      page                = {page}
      onPageChange        = {(_, pageNumber) => onPageChange(pageNumber)}
      onRowsPerPageChange = {(event) => onRowsPerPageChange(+event.target.value)}
    />
  </DataTable.Wrapper>
);

DataTable.Wrapper = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding || '30px'};
`;

DataTable.Loading = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  padding         : 48px 0;
`;

DataTable.NoResult = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  padding         : 25px 0;
  color           : grey;
  font-weight     : 600;
`;

DataTable.Headers = styled(TableRow)`
  background-color: black;

  & th {
    font-weight : 600;
    color       : white;
  }
`;

DataTable.Row = styled(TableRow)`
  &:nth-of-type(even) {
    background: #f5f5f5;
  };

  &:last-child td, &:last-child th: {
    border: 0;
  };
`;
