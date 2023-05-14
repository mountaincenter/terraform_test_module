import React, { useState, useEffect, useContext } from 'react';
import { getHealths } from 'lib/api/healths';
// import HealthForm from './HealthForm';
import { type Health, type User } from 'interfaces';
import { AuthContext } from 'providers/AuthProvider';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Graph from './Graph';

const HealthHome = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext) as { currentUser: User };
  const [healths, setHealths] = useState<Health[]>([]);
  const handleGetHealths = async (id: number): Promise<void> => {
    const { data } = await getHealths(currentUser.id);
    setHealths(data.healths);
    // console.log(data.healths);
  };
  useEffect(() => {
    void handleGetHealths(currentUser.id);
  }, []);

  console.log(healths);

  return (
    <>
      {/* <HealthForm
        currentUser={currentUser}
        handleGetHealths={() => handleGetHealths}
      /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell align='right'>体重(kg)</TableCell>
              <TableCell align='right'>体脂肪率(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {healths.map((health) => (
              <TableRow
                key={health.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {new Date(health.date).toLocaleDateString()}
                </TableCell>
                <TableCell align='right'>{health.weight.toFixed(1)}</TableCell>
                <TableCell align='right'>
                  {health.bodyFatPercent?.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Graph
        currentUser={currentUser}
        handleGetHealths={handleGetHealths}
        healths={healths}
      />
    </>
  );
};

export default HealthHome;
