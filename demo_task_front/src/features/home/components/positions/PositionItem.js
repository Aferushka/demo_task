import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function PositionItem({ position }) {
  return (
      <TableRow>
          <TableCell>{position.name}</TableCell>
          <TableCell>{position.okpd2_code}</TableCell>
          <TableCell>{position.okei_code}</TableCell>
      </TableRow>
  );
};

