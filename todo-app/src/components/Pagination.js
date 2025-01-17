// /components/Pagination.js
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ count, page, onPageChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onPageChange}
      shape="rounded"
    />
  );
};

export default Pagination;
